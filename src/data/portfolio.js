// All editable content lives here. Asset paths are relative to public/.
// Only set publicCvUrl after supplying an approved, public-safe CV.
export const profile = {
  name: 'Renato G. Beroy', initials: 'RB',
  image: '/images/renato-profile.jpg.jpg', imageAlt: 'Portrait of Renato G. Beroy',
  role: 'Embedded Systems & IoT Enthusiast',
  email: 'renato.beroy@g.msuiit.edu.ph', location: 'Iligan City, Philippines',
  introduction: "HELLO, I'M",
  headline: 'Building Intelligent Systems Where Hardware Meets Software.',
  subtitle: "I'm Renato G. Beroy, an Embedded Systems student passionate about IoT, microcontrollers, digital electronics, and practical engineering solutions.",
  heroDescription: 'Fourth-year BS Computer Applications student focused on embedded hardware, microcontroller programming, electronics, and IoT development.',
  publicCvUrl: null,
  heroLabels: ['Embedded systems', 'IoT development', 'Hardware prototyping'],
}

export const navigation = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' }, { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' }, { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  title: 'About Me', lead: 'Curiosity in the circuit. Purpose in the code.',
  paragraphs: [
    "I'm a fourth-year BS Computer Applications student majoring in Embedded Systems at MSU-Iligan Institute of Technology. I enjoy exploring how electronics and software come together to solve practical problems.",
    'My project experience spans IoT monitoring, microcontroller programming, digital logic design, and industrial automation. I’m interested in embedded firmware, sensor integration, and building practical hardware-software solutions.',
  ],
  areas: [
    { id: 'embedded', title: 'Embedded Systems', description: 'Microcontrollers & firmware', icon: 'chip' },
    { id: 'iot', title: 'IoT & Sensor Integration', description: 'Sensing & connected systems', icon: 'signal' },
    { id: 'logic', title: 'Digital Logic', description: 'HDL & control architectures', icon: 'circuit' },
    { id: 'automation', title: 'Industrial Automation', description: 'PLC programming & HMI', icon: 'sliders' },
  ],
}

export const skills = [
  { id: 'programming', title: 'Programming', icon: 'code', items: ['C++', 'Python', 'PLC Programming', 'Verilog HDL'] },
  { id: 'web', title: 'Web Technologies', icon: 'globe', items: ['HTML', 'CSS'] },
  { id: 'development', title: 'Development Tools', icon: 'terminal', items: ['RT-Thread', 'Arduino IDE', 'Visual Studio Code', 'XAMPP', 'CODESYS', 'AMD Vivado', 'Google Colab', 'PictoBlox', 'Edge Impulse', 'Wokwi'] },
  { id: 'project-tools', title: 'Additional Project Tools', icon: 'layers', items: ['PlatformIO', 'Qt / QML', 'FreeRTOS', 'Atmel Studio'] },
  { id: 'hardware', title: 'Embedded Hardware', icon: 'chip', items: ['Arduino Uno', 'ESP32', 'STM32F103C8T6', 'Raspberry Pi 3', 'Sensors and Actuators', 'Integrated Circuits', 'Multimeter', 'Breadboarding', 'Soldering'] },
  { id: 'electronics', title: 'Electronics', icon: 'circuit', items: ['Basic Circuit Design', 'Electric Circuits', 'Fundamentals of Electronics', 'Hardware Prototyping', 'Schematic Design', 'Circuit Simulation'] },
]

// Illustrations are used until real media is supplied. No undocumented tools are added.
export const projectFilters = ['All', 'Embedded Systems', 'IoT', 'Automation', 'Robotics', 'Software']
export const projects = [
  {
    id: 'geosentry', title: 'GeoSentry',
    fullTitle: 'GeoSentry: IoT-Based Landslide Monitoring and Early Warning System Using Explainable AI',
    subtitle: 'IoT-Based Landslide Monitoring and Early Warning System Using Explainable AI',
    category: 'IoT / Research / Embedded Systems', filters: ['IoT', 'Embedded Systems'],
    description: 'An IoT-based landslide monitoring and early warning system integrating environmental sensors, Raspberry Pi 3, and Explainable AI.',
    note: 'A thesis in progress, exploring environmental monitoring and explainable insights for early warning.',
    technologies: ['IoT', 'Raspberry Pi 3', 'Environmental Sensors', 'Explainable AI'],
    status: 'Thesis — In Progress', featured: true, icon: 'mountain', image: null, imageAlt: '', url: null,
  },
  {
    id: 'multisensor', title: 'Real-Time Multisensor Room Monitoring System',
    category: 'Embedded Systems / Real-Time Systems', filters: ['Embedded Systems'],
    description: 'Developed an STM32F103C8T6-based multisensor monitoring system using FreeRTOS for real-time task management, sensor integration, and environmental monitoring.',
    technologies: ['STM32F103C8T6 Blue Pill', 'C/C++', 'FreeRTOS', 'PlatformIO', 'Wokwi'],
    icon: 'signal', image: null, imageAlt: '', url: 'https://github.com/Atoyyyyyy/bca182-freertos-multisensor', linkLabel: 'View repository',
  },
  {
    id: 'oven-verilog', title: 'Industrial Drying Oven Controller', subtitle: 'Using Verilog HDL',
    category: 'Digital Logic / FPGA', filters: ['Embedded Systems'],
    description: 'Designed and simulated FPGA-based digital control architectures for an industrial drying oven using Verilog HDL.',
    technologies: ['Verilog HDL', 'FPGA', 'Digital Logic Design'],
    icon: 'circuit', image: null, imageAlt: '', url: 'https://tinyurl.com/bdhnsk66', linkLabel: 'View project',
  },
  {
    id: 'oven-codesys', title: 'Industrial Drying Oven Controller', subtitle: 'Using CODESYS',
    category: 'Industrial Automation', filters: ['Automation'],
    description: 'Designed a simulated industrial oven control system using CODESYS, Structured Text, and interactive HMI dashboards for automated thermal management.',
    technologies: ['CODESYS', 'Structured Text', 'HMI', 'Industrial Automation'],
    icon: 'sliders', image: null, imageAlt: '', url: 'https://tinyurl.com/4yaxwpb6', linkLabel: 'View project',
  },
  {
    id: 'puritor', title: 'Puritor', subtitle: 'Purify and Sanitize Water System',
    category: 'Software Development / Automation', filters: ['Software', 'Automation'],
    description: 'Designed and developed a water purification and sanitization system prototype using Qt C++ QML and Object-Oriented Programming for automated water quality monitoring and treatment.',
    technologies: ['C++', 'Qt', 'QML', 'Object-Oriented Programming'],
    icon: 'droplet', image: null, imageAlt: '', url: 'https://tinyurl.com/4xvytv6v', linkLabel: 'View project',
  },
  {
    id: 'line-robot', title: 'Line Following Robot',
    category: 'Robotics / Microcontrollers', filters: ['Robotics', 'Embedded Systems'],
    description: 'Designed and built an autonomous line-following robot using Arduino Uno, two DC gear motors, and sensor-based control. Programmed and tested using Arduino IDE and Atmel Studio.',
    technologies: ['Arduino Uno', 'DC Gear Motors', 'Sensors', 'Arduino IDE', 'Atmel Studio'],
    icon: 'robot', image: null, imageAlt: '', url: 'https://tinyurl.com/4p5utz52', linkLabel: 'View project',
  },
  {
    id: 'board-brawl', title: 'Board Brawl', subtitle: 'Checkers Game',
    category: 'Embedded Software', filters: ['Software', 'Embedded Systems'],
    description: 'A checkers game implementing standard game rules, valid-move checking, automatic king conversion, and turn indication.',
    technologies: ['RT-Thread'],
    icon: 'board', image: null, imageAlt: '', url: 'https://tinyurl.com/2rjwu4vk', linkLabel: 'View project',
  },
  {
    id: 'activity', title: 'Human Activity Recognition System', category: 'Activity Recognition', filters: ['Software'],
    description: 'Developed an activity recognition project exploring the identification and classification of human activities using computational techniques.',
    technologies: [],
    icon: 'activity', image: null, imageAlt: '', url: 'https://github.com/Atoyyyyyy/Activity-Recognition', linkLabel: 'View repository',
  },
  {
    id: 'mp3', title: 'Personal MP3 Player', subtitle: 'Using Embedded Systems',
    category: 'Embedded Systems', filters: ['Embedded Systems'],
    description: 'Developed a personal MP3 player with embedded audio playback, user controls, and hardware-software integration.',
    technologies: [],
    icon: 'music', image: null, imageAlt: '', url: 'https://github.com/Rie07/Personal-MP3-Player', linkLabel: 'View repository',
  },
]

export const education = [
  { id: 'college', degree: 'Bachelor of Science in Computer Applications', specialization: 'Major in Embedded Systems', institution: 'MSU-Iligan Institute of Technology', location: profile.location, period: 'August 2023 – Present', status: 'Fourth-Year Student' },
  { id: 'senior-high', degree: 'Senior High School', specialization: 'Technical-Vocational-Livelihood (TVL) Strand', institution: 'Iligan Computer Institute', location: profile.location, period: 'June 2021 – 2023' },
]

// Certificate links remain hidden until real, public-safe files are provided.
export const certifications = [
  { id: 'ai', title: 'AI Career Readiness Training', issuer: 'AI Ready ASEAN / MSU-IIT', date: 'August 18, 2026', kind: 'Training', icon: 'spark', certificateUrl: null },
  { id: 'quantum', title: 'Quantum Circuits as Pictures: An Introduction to ZX Calculus Webinar', issuer: 'Quantum Computing Society of the Philippines', date: 'March 20, 2026', kind: 'Webinar', icon: 'atom', certificateUrl: null },
  { id: 'rtthread', title: 'Introduction to Embedded Systems Programming Using RT-Thread IoT OS', issuer: 'RT-Thread / CCS, MSU-IIT', date: 'November 24–25, 2025', kind: 'Training', icon: 'chip', certificateUrl: null },
  { id: 'mikrotik', title: 'MikroTik Certified Network Associate Training', issuer: 'DICT & MikroTik / Iligan Computer Institute', date: 'May 3–5, 2023', kind: 'Training', icon: 'network', certificateUrl: null },
  { id: 'ojt', title: 'ADVANZTECH Computer Parts and Services — Senior High School OJT', issuer: 'ADVANZTECH', date: 'February 2023', kind: 'OJT', icon: 'tools', certificateUrl: null },
]

export const handsOn = { title: 'MikroTik Networking Training', date: 'May 2023', description: 'Configured a MikroTik server and basic network settings.' }
export const contact = {
  title: "Let's Connect",
  description: "I'm interested in opportunities to learn, collaborate, and apply embedded systems and software development skills to real-world engineering projects.",
  email: profile.email, location: profile.location,
}
