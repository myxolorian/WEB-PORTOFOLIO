// Projects shown in "Selected Work" and in the detail pop-up.
//
// To add screenshots: drop images in /public/images/projects/<slug>/ and list
// them in `gallery`. The first gallery image is used as the card cover unless
// `cover` is set. Projects without images get a typographic cover.

const img = (slug, file) => `/images/projects/${slug}/${file}`

export const projects = [
  {
    slug: 'taskweaver',
    title: 'TaskWeaver',
    category: 'Fullstack · AI',
    year: '2026',
    role: 'Back-End Developer',
    accent: '#4aa3ff',
    tagline: 'AI-powered task management for group projects.',
    summary:
      'Splits big tasks into subtasks and assigns each one to the teammate whose skills fit best, with real-time chat built in.',
    overview:
      "TaskWeaver is a task management web app for group projects. It uses AI to analyze each member's skill profile, break a large task into subtasks, and assign each one to the most suitable person. It also ships real-time team chat, a file manager, a calendar view, a team activity feed, and team and role management.",
    problem:
      'Task distribution in group projects is often uneven, with some members contributing nothing while others carry the whole team.',
    contributions: [
      'Designed the Task System and built the Express.js back end with 50+ REST API endpoints for users, groups, tasks, channels, file uploads and activity tracking.',
      'Built the real-time Chat feature with Socket.IO.',
      "Built the AI feature with the Gemini API to assign tasks based on each member's skillset.",
      'Designed a layered architecture (controller, service, repository) on a PostgreSQL database hosted on Supabase.',
    ],
    learnings:
      'Halfway through development, unexpected database schema changes forced me to restructure the tables and rewrite multiple stored procedures. It taught me that clean code patterns, separating core systems from the start, and a well-designed ERD make maintaining and refactoring a web application much easier.',
    stack: [
      { group: 'Front-end', items: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS'] },
      { group: 'Back-end', items: ['Node.js', 'Express.js', 'Socket.IO', 'Gemini API'] },
      { group: 'Data', items: ['PostgreSQL', 'Supabase'] },
    ],
    links: [
      { label: 'Live site', href: 'https://task-weaver.vercel.app' },
      { label: 'Front-end repo', href: 'https://github.com/rfvvel/TaskWeaver' },
      { label: 'Back-end repo', href: 'https://github.com/myxolorian/ProjectTaskWeaverBackend' },
    ],
    gallery: [
      { src: img('taskweaver', '01.png'), caption: 'Dashboard' },
      { src: img('taskweaver', '02.png'), caption: 'Chat room' },
      { src: img('taskweaver', '03.png'), caption: 'Team activity' },
      { src: img('taskweaver', '04.png'), caption: 'List of my tasks' },
      { src: img('taskweaver', '05.png'), caption: 'Calendar' },
      { src: img('taskweaver', '06.png'), caption: 'Task management for group leaders' },
    ],
  },
  {
    slug: 'nutriscan',
    title: 'NutriScan',
    category: 'Computer Vision',
    year: '2026',
    role: 'Fullstack Developer',
    accent: '#ff6a3d',
    tagline: 'Calories and nutrition from a photo, a video or a live camera.',
    summary:
      'Detects food with YOLOv8 and OpenCV, estimates the portion, and reports calories, protein, carbs and fat.',
    overview:
      'NutriScan is a food calorie and nutrition detection website that I built on my own for a Computer Vision class project. It takes a photo, a video, or a live camera feed of a meal and tells you the food, the portion size, and its calories, protein, carbs and fat using YOLOv8 and OpenCV.',
    problem:
      'Home-cooked meals and restaurant dishes have no nutrition labels, and looking them up manually takes a lot of time.',
    contributions: [
      'Built a food recognition system that detects and classifies food items from images using YOLOv8.',
      'Designed the end-to-end pipeline, from dataset preparation and model training to evaluation.',
      'Added portion estimation so each detected item gets its own calorie and macronutrient breakdown.',
      'Built the React front end and the FastAPI back end that serve photo, video and live-camera detection.',
    ],
    stack: [
      { group: 'Front-end', items: ['React.js', 'Vite', 'Tailwind CSS'] },
      { group: 'Back-end', items: ['Python', 'FastAPI'] },
      { group: 'AI / CV', items: ['YOLOv8', 'OpenCV'] },
    ],
    links: [
      { label: 'Front-end repo', href: 'https://github.com/myxolorian/NutriScan-ComVisFrontend' },
      { label: 'Back-end repo', href: 'https://github.com/myxolorian/NutriScan-ComVisBackend' },
    ],
    gallery: [
      { src: img('nutriscan', '01.png'), caption: 'Food detection and nutrition estimation' },
      { src: img('nutriscan', '02.png'), caption: 'Portion estimation' },
      { src: img('nutriscan', '03.png'), caption: 'Detecting a mixed salad' },
      { src: img('nutriscan', '04.png'), caption: 'Portion estimation on a salad' },
      { src: img('nutriscan', '05.png'), caption: 'Live camera detection' },
      { src: img('nutriscan', '06.png'), caption: 'Live camera detection' },
    ],
  },
  {
    slug: 'caloriq',
    title: 'CalorIQ',
    category: 'NLP · RAG',
    year: '2026',
    role: 'AI Engineer',
    accent: '#4cc46a',
    tagline: 'A chatbot that recommends recipes that fit your body and your cravings.',
    summary:
      'Semantic recipe search with Sentence-BERT plus a RAG layer on Groq/Llama, tuned to your BMI and daily calories.',
    overview:
      "DIVA is an NLP-based chatbot that gives personalized recipe recommendations based on the user's body mass index and what they're craving. It suggests a balanced main and side dish that fits their calorie and nutrition needs.",
    problem:
      'Recipe websites give the same generic meals to everyone, and checking whether each dish fits your daily calories takes too much time.',
    contributions: [
      'Built the recommendation engine by preprocessing the Food.com recipe dataset and encoding it with Sentence-BERT.',
      "Cached the embeddings to disk so a user's query is encoded and matched to the closest semantic recipes quickly.",
      'Added a retrieval-augmented generation (RAG) layer on Groq/Llama so answers are grounded in the retrieved food data.',
    ],
    stack: [
      { group: 'Front-end', items: ['React.js', 'Vite', 'Tailwind CSS'] },
      { group: 'Back-end', items: ['Python', 'FastAPI'] },
      { group: 'AI / NLP', items: ['Sentence-BERT', 'Groq / Llama', 'RAG'] },
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/myxolorian/DIVA' }],
    gallery: [
      { src: img('caloriq', '01.png'), caption: 'Landing page' },
      { src: img('caloriq', '02.png'), caption: 'Profile input' },
      { src: img('caloriq', '03.png'), caption: 'Chatbot room' },
      { src: img('caloriq', '04.png'), caption: 'Meal ingredients and how to make it' },
      { src: img('caloriq', '05.png'), caption: 'Follow-up message' },
      { src: img('caloriq', '06.png'), caption: 'Recommendation details' },
    ],
  },
  {
    slug: 'ecobill',
    title: 'EcoBill AI',
    category: 'OCR · Climate',
    year: '2025',
    role: 'Fullstack Developer',
    accent: '#8fd14f',
    tagline: 'Scan your electricity bill, see your carbon footprint.',
    summary:
      'Reads PLN bills with OCR, estimates the cost and CO₂ emissions, and tracks consumption month by month.',
    overview:
      "EcoBill AI is a web application inspired by UN SDG 13: Climate Action. It uses OCR to scan electricity bills, extract the kWh value, calculate the estimated cost based on Indonesian PLN tariff classes, and compute the household's carbon emissions using the national emission factor.",
    problem: 'Households only look at the total cost of their bill and never see their CO₂ contribution.',
    contributions: [
      'Scans every detected word on the bill, locates “kWh”, and searches the neighbouring words for the numeric value.',
      'Calculates the estimated cost from PLN tariff classes and CO₂ emissions from the national emission factor.',
      'Lets users store monthly bills and view a statistics dashboard to track consumption and compare it against household benchmarks.',
    ],
    learnings:
      'The biggest challenge was making OCR reliable across different bill layouts, fonts and print quality. I learned that OCR alone is not enough: adding logic to find the number around “kWh” and preprocessing the image significantly improved detection accuracy.',
    stack: [
      { group: 'Front-end', items: ['Streamlit'] },
      { group: 'Back-end', items: ['Python', 'Tesseract OCR', 'OpenCV'] },
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/myxolorian/EcoBill' }],
    gallery: [
      { src: img('ecobill', '01.png'), caption: 'AI reads the bill' },
      { src: img('ecobill', '02.png'), caption: 'AI reads an e-bill' },
      { src: img('ecobill', '03.png'), caption: 'Statistics dashboard' },
      { src: img('ecobill', '04.png'), caption: 'Manage saved bills' },
    ],
  },
  {
    slug: 'diva',
    title: 'DIVA',
    category: '.NET · Fullstack',
    year: 2026,
    role: 'Fullstack Developer',
    accent: '#c9a3ff',
    tagline: 'Laundry management, from order wizard to shareable receipts.',
    summary:
      'An ASP.NET Core API and a 10-page web app for customers, orders, services, reports and public receipts.',
    overview:
      'DIVA is a laundry management web app for running day-to-day operations: customers, services, orders, a dashboard and reports. Orders produce receipts that can be downloaded as PDFs or shared through secure public links.',
    contributions: [
      'Built an ASP.NET Core Web API (.NET 10) with EF Core and PostgreSQL, exposing endpoints for customers, services, orders, a dashboard and reports.',
      'Secured the API with Supabase JWT authentication and PostgreSQL row-level security, and managed the schema with EF Core migrations.',
      'Generated order receipts as downloadable PDFs (QuestPDF) and as shareable public links protected by random tokens and rate limiting.',
      'Built 10 pages, including login, dashboard, customers, orders, services, reports, settings and a public receipt page, with a 3-step order wizard, live search and a custom SVG revenue chart.',
    ],
    stack: [
      { group: 'Back-end', items: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'QuestPDF'] },
      { group: 'Data & auth', items: ['PostgreSQL', 'Supabase JWT', 'Row-level security'] },
      { group: 'Front-end', items: ['JavaScript', 'Bootstrap 5'] },
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/myxolorian/DIVA' }],
    gallery: [
      { src: img('diva', '01.png'), caption: 'Dashboard' },
      { src: img('diva', '02.png'), caption: 'Order Service' },
      { src: img('diva', '03.png'), caption: 'Customer List' },
      { src: img('diva', '04.png'), caption: 'Financial Report' },
      { src: img('diva', '05.png'), caption: 'Making Order' },
      { src: img('diva', '06.png'), caption: 'Order Made' },
      { src: img('diva', '07.png'), caption: 'Order Receipt' },
    ],
  },
]
