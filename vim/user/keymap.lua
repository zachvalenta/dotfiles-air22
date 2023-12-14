local opts = { noremap = true, silent = true }
local keymap = vim.api.nvim_set_keymap

-- LEADER
keymap("", "<Space>", "<Nop>", opts)
vim.g.mapleader = " "
vim.g.maplocalleader = " "

--- TELESCOPE
keymap("n", "<leader>f", "<cmd>Telescope find_files follow=true<cr>",  opts)
keymap("n", "<leader>g", "<cmd>Telescope live_grep<cr> ",  opts)
keymap("n", "<leader>b", "<cmd>Telescope git_branches<cr>",  opts)
