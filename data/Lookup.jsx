export default {
    HERO_HEADING: 'What do want to build today?',
    HERO_DESC: 'Find the best resources to build your next project',
    SUGGESTIONS: ['Create TODO app in react', 'Create Budget Tract App', 'Create a Blog', 'Create a Portfolio', 'Create a password manager'],

    DEFAULT_FILES: {
        '/public/index.html': {
            code:
                `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name = viewport content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script src = "https://cdn.tailwindcss.com"></script>
            </head>
            <body>
            <div id="root"></div>
            </body>
            </html>`
        },
        '/App.css': {
            code: `
            @tailwind base;
            @tailwind components;
            @tailwind utilities;
            `
        },
        '/tailwind.config.js': {
            code: `
            /** @ type {import('tailwindcss').Config} */
            module.exports = {
            content:["./**/*.js"],
            theme: {
            extend:{},

            },
            plugins:[]
        }`
        },

        '/postcss.config.js': {
            code: `/** @ type {import('postcss-load-config').Config} */
            const config = {
            plugins:{
            tailwindcss:{},
        },
            }};

            export default config;
            
            `,

        }


    },





    DEPENDANCY: {
        "postcss": "^8",
        autoprefixer: "^10.0.0",
        "tailwindcss": '^3.4.1',
        "uuid4": "^2.0.3",
        "tailwind-merge": "^2.4.0",
        "lucide-react": "latest",
        "@google/generative-ai": "^0.21.0",
        "react-router-dom": "latest",


    },
    PRICING_DESC: 'Get started with CursorCloud today. Choose the plan that’s right for your team, and change plans at any time.',
    PRICING_OPTIONS:[
        {
            name:'Free',
            tokens:'1K',
            value:'1000',
            desc:'Ideal for hobbyists and beginners',
            price:'0',

        },

        {
            name:'Starter',
            tokens:'10K',
            value:'10000',
            desc:'Ideal for small teams and startups',
            price:'10', 
        },
        {
            name:'Pro',
            tokens:'100K',
            value:'100000',
            desc:'Ideal for growing teams and businesses',
            price:'100', 
        },
        {
            name:'Enterprise',
            tokens:'Unlimited',
            value:'Unlimited',
            desc:'Ideal for large teams and enterprises',
            price:'500', 
        }

    ]
}