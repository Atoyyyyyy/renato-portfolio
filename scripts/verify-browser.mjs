// Dependency-free browser checks using an already running Chromium debugging endpoint.
// Start a local preview and headless Edge/Chrome with --remote-debugging-port=9222 first.
import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { projects, projectFilters, navigation, certifications, profile } from '../src/data/portfolio.js'

const baseUrl = process.env.PORTFOLIO_QA_URL || 'http://127.0.0.1:5173/'
const debugUrl = process.env.PORTFOLIO_DEBUG_URL || 'http://127.0.0.1:9222'
const siteResponse = await fetch(baseUrl)
assert.equal(siteResponse.status, 200, 'Local site must return HTTP 200')
const targets = await fetch(`${debugUrl}/json/list`).then(response => response.json())
const target = targets.find(item => item.type === 'page')
assert.ok(target, 'A browser page must be available')
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})
let sequence = 0
const pending = new Map()
const runtimeErrors = []
const consoleErrors = []
const failedRequests = []
const requestUrls = new Map()
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails)
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') consoleErrors.push(message.params.args)
  if (message.method === 'Network.requestWillBeSent') requestUrls.set(message.params.requestId, message.params.request.url)
  if (message.method === 'Network.loadingFailed') failedRequests.push({ url: requestUrls.get(message.params.requestId), error: message.params.errorText })
  if (!message.id) return
  const request = pending.get(message.id)
  if (!request) return
  clearTimeout(request.timeout)
  pending.delete(message.id)
  if (message.error) request.reject(new Error(JSON.stringify(message.error)))
  else request.resolve(message.result)
})

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)) }, 20000)
    pending.set(id, { resolve, reject, timeout })
    socket.send(JSON.stringify({ id, method, params }))
  })
}
async function evaluate(expression) {
  const response = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text + ': ' + response.exceptionDetails.exception?.description)
  return response.result.value
}
async function settle() {
  await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))')
}
async function viewport(width, height = 1000) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
  await settle()
}
async function screenshot(name) {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  await writeFile(`.qa/${name}.png`, Buffer.from(result.data, 'base64'))
}
async function click(selector) {
  const rect = await evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x:r.x+r.width/2, y:r.y+r.height/2 } })()`)
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...rect, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...rect, button: 'left', clickCount: 1 })
  await settle()
}

const report = { baseUrl, viewports: [], filters: [], interactions: [] }
try {
  await mkdir('.qa', { recursive: true })
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Network.enable')
  await viewport(1440)
  await send('Page.navigate', { url: baseUrl })
  // Wait for the React mount with a bounded browser-side poll.
  await evaluate(`new Promise((resolve,reject) => {
    const start = performance.now();
    function check() { if (document.querySelectorAll('.project-card').length === 9) resolve(true); else if(performance.now()-start > 10000) reject(new Error('React mount timed out')); else setTimeout(check,50) }
    check()
  })`)
  await evaluate('Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 5000))]).then(() => true)')
  await settle()

  const structure = await evaluate(`({
    h1:document.querySelectorAll('h1').length,
    profileAlt:document.querySelector('.hero-portrait img')?.alt,
    projects:document.querySelectorAll('.project-card').length,
    certificates:document.querySelectorAll('.certification-card').length,
    cvDisabled:document.querySelector('.cv-placeholder')?.disabled,
    status:document.querySelector('.featured-label')?.textContent,
    mail:document.querySelector('.contact-copy .button').getAttribute('href'),
    brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href').slice(1)).filter(id=>!document.getElementById(id)),
    links:[...document.querySelectorAll('.project-link')].map(a=>({href:a.href,target:a.target,rel:a.rel})),
    certificateLinks:document.querySelectorAll('a[href*="/certificates/"]').length,
    imageFailures:[...document.images].filter(img=>img.complete && !img.naturalWidth).length,
    profileImage:{src:document.querySelector('.hero-portrait img')?.getAttribute('src'),loaded:!!document.querySelector('.hero-portrait img')?.naturalWidth,alt:document.querySelector('.hero-portrait img')?.alt},
    title:document.title
  })`)
  assert.equal(structure.h1, 1)
  assert.equal(structure.profileAlt, profile.imageAlt)
  assert.equal(structure.projects, projects.length)
  assert.equal(structure.certificates, certifications.length)
  assert.equal(structure.cvDisabled, true)
  assert.equal(structure.status, 'Thesis — In Progress')
  assert.equal(structure.mail, `mailto:${profile.email}`)
  assert.deepEqual(structure.brokenAnchors, [])
  assert.equal(structure.certificateLinks, 0)
  assert.equal(structure.imageFailures, 0)
  assert.equal(structure.profileImage.src, profile.image)
  assert.equal(structure.profileImage.loaded, true, 'The supplied portrait must load in the Hero')
  assert.equal(structure.profileImage.alt, profile.imageAlt)
  assert.deepEqual(structure.links.map(link => link.href), projects.filter(project => project.url).map(project => project.url))
  structure.links.forEach(link => { assert.equal(link.target, '_blank'); assert.ok(link.rel.includes('noopener') && link.rel.includes('noreferrer')) })
  report.structure = structure

  for (const width of [1440, 1280, 1024, 820, 768, 540, 390, 320]) {
    await viewport(width)
    const layout = await evaluate(`({width:innerWidth, documentWidth:document.documentElement.scrollWidth,
      projectColumns:getComputedStyle(document.querySelector('.projects-grid')).gridTemplateColumns.split(' ').length,
      menuVisible:getComputedStyle(document.querySelector('.menu-toggle')).display !== 'none',
      navVisible:getComputedStyle(document.querySelector('.primary-nav')).display !== 'none',
      portraitWidth:Math.round(document.querySelector('.hero-portrait img').getBoundingClientRect().width),
      portraitRight:document.querySelector('.hero-portrait').getBoundingClientRect().right,
      portraitTop:document.querySelector('.hero-portrait').getBoundingClientRect().top,
      textRight:document.querySelector('.hero-copy').getBoundingClientRect().right,
      textBottom:document.querySelector('.hero-copy').getBoundingClientRect().bottom,
      containerWidth:document.querySelector('.hero-layout').getBoundingClientRect().width
    })`)
    assert.ok(layout.documentWidth <= width, `Horizontal overflow at ${width}: ${layout.documentWidth}`)
    assert.equal(layout.projectColumns, width > 999 ? 3 : width > 540 ? 2 : 1)
    assert.equal(layout.menuVisible, width < 1000)
    assert.equal(layout.navVisible, width >= 1000)
    if (width > 1100) {
      assert.ok(layout.portraitWidth >= 550 && layout.portraitWidth <= 650, `Desktop portrait width at ${width}: ${layout.portraitWidth}`)
      assert.ok(layout.textRight <= layout.portraitRight, 'Hero text must not overlap the desktop portrait')
    } else if (width > 760) {
      assert.ok(layout.portraitWidth >= 400 && layout.portraitWidth <= 480, `Tablet portrait width at ${width}: ${layout.portraitWidth}`)
      assert.ok(layout.portraitTop >= layout.textBottom, 'Hero text must appear above the tablet portrait')
    } else {
      assert.ok(layout.portraitWidth <= layout.containerWidth * .9 + 1, `Mobile portrait must fit within 90% of its container at ${width}`)
      assert.ok(layout.portraitTop >= layout.textBottom, 'Hero text must appear above the mobile portrait')
    }
    report.viewports.push(layout)
  }

  await viewport(1440, 1000)
  await evaluate('window.scrollTo({top:0,behavior:"instant"})')
  await screenshot('desktop-hero')
  await evaluate('window.scrollTo({top:document.querySelector("#projects").offsetTop-95,behavior:"instant"})')
  await settle()
  await screenshot('desktop-projects')
  for (const filter of projectFilters) {
    await evaluate(`document.querySelectorAll('.project-filters button')[${projectFilters.indexOf(filter)}].click()`)
    await settle()
    const count = await evaluate('document.querySelectorAll(".project-card").length')
    const expected = projects.filter(project => filter === 'All' || project.filters.includes(filter)).length
    assert.equal(count, expected, `Filter ${filter}`)
    const pressed = await evaluate('document.querySelector(".project-filters [aria-pressed=true]").textContent')
    assert.equal(pressed, filter)
    report.filters.push({ filter, count })
  }
  await evaluate('document.querySelector(".project-filters button").click()')
  await viewport(390, 844)
  await evaluate('window.scrollTo({top:0,behavior:"instant"})')
  await settle()
  await screenshot('mobile-hero')
  await click('.menu-toggle')
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'true')
  await screenshot('mobile-menu')
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
  await settle()
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false')
  assert.equal(await evaluate('document.activeElement.className'), 'menu-toggle')
  report.interactions.push('Mobile menu opens; Escape closes it and restores toggle focus')
  await click('.menu-toggle')
  await click('#primary-navigation a[href="#projects"]')
  await evaluate(`new Promise((resolve,reject) => {
    const start=performance.now();
    function check() {
      const expected=Math.min(document.getElementById('projects').offsetTop-100, document.documentElement.scrollHeight-innerHeight);
      if (Math.abs(scrollY-expected)<3) resolve(true);
      else if(performance.now()-start>3000) reject(new Error('Project anchor did not reach its destination'));
      else setTimeout(check,30);
    }
    check();
  })`)
  await settle()
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false')
  assert.equal(await evaluate('document.activeElement.id'), 'projects')
  const anchorTop = await evaluate('document.querySelector("#projects").getBoundingClientRect().top')
  assert.ok(anchorTop >= 70, 'Project heading must clear the sticky navbar')
  assert.equal(await evaluate('location.hash'), '#projects')
  await screenshot('mobile-projects')
  report.interactions.push('Mobile selection closes menu, focuses destination, and scrolls below the sticky header')
  await click('.menu-toggle')
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 370, y: 700, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 370, y: 700, button: 'left', clickCount: 1 })
  await settle()
  assert.equal(await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")'), 'false')
  report.interactions.push('Outside click closes mobile navigation')

  await viewport(1440)
  for (const {id} of navigation) {
    await evaluate(`document.getElementById(${JSON.stringify(id)}).scrollIntoView({behavior:'instant'})`)
    await settle()
    assert.equal(await evaluate('document.querySelector(".primary-nav [aria-current=location]").getAttribute("href")'), `#${id}`)
  }
  report.interactions.push('All seven section anchors update active navigation')
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
  await evaluate('document.querySelector(".skip-link").focus()')
  assert.equal(await evaluate('getComputedStyle(document.activeElement).outlineStyle'), 'solid')
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 })
  await settle()
  assert.equal(await evaluate('document.activeElement.id'), 'main-content')
  report.interactions.push('Keyboard Enter activates the skip link and moves focus into main content')
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'), 'auto')
  report.interactions.push('Reduced-motion preference disables smooth scrolling')
  await send('Emulation.setEmulatedMedia', { features: [] })
  assert.deepEqual(runtimeErrors, [], 'Browser JavaScript exceptions')
  assert.deepEqual(consoleErrors, [], 'Browser console errors')
  assert.equal(failedRequests.filter(request => request.url?.startsWith(baseUrl)).length, 0, 'Local assets must load')
  report.runtimeErrors = runtimeErrors
  report.consoleErrors = consoleErrors
  report.failedRequests = failedRequests
  report.result = 'PASS'
  await writeFile('.qa/browser-report.json', JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally { socket.close() }
