<!DOCTYPE html>
<html class="light" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>SecureGate - Temukan Event Terbaikmu</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">

        <!-- Styles -->
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])

        <style>
            body { 
                font-family: 'Inter', sans-serif; 
            }
            .no-scrollbar::-webkit-scrollbar { 
                display: none; 
            }
            .no-scrollbar { 
                -ms-overflow-style: none; 
                scrollbar-width: none; 
            }
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                vertical-align: middle;
            }
            .coral-pill { 
                border-radius: 22px; 
            }
            .card-shadow { 
                border: 0.5px solid #EBEBEB; 
            }
            .pb-safe {
                padding-bottom: env(safe-area-inset-bottom);
            }
        </style>
    </head>
    <body class="bg-surface text-on-surface selection:bg-primary-fixed">
        <div id="app"></div>
    </body>
</html>
