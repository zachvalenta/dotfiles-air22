call plug#begin()
Plug 'nvim-lua/plenary.nvim'
Plug 'nvim-telescope/telescope.nvim'
Plug 'catppuccin/nvim', { 'as': 'catppuccin'}
Plug 'rrethy/vim-illuminate'
Plug 'echasnovski/mini.indentscope', { 'branch': 'stable'}
Plug 'echasnovski/mini.pairs', { 'branch': 'stable'}
Plug 'echasnovski/mini.map', { 'branch': 'stable'}
Plug 'nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}
Plug 'stevearc/aerial.nvim'
Plug 'nvim-tree/nvim-web-devicons'
Plug 'romgrk/barbar.nvim'
Plug 'williamboman/mason.nvim'
Plug 'williamboman/mason-lspconfig.nvim'
Plug 'neovim/nvim-lspconfig'
Plug 'hrsh7th/nvim-cmp'
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'L3MON4D3/LuaSnip'
Plug 'VonHeikemen/lsp-zero.nvim', {'branch': 'v3.x'}
call plug#end()
