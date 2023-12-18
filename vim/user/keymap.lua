local opts = { noremap = true, silent = true }
local keymap = vim.api.nvim_set_keymap

-- LEADER
keymap("", "<Space>", "<Nop>", opts)
vim.g.mapleader = " "
vim.g.maplocalleader = " "

-- TELESCOPE
keymap("n", "<leader>f", "<cmd>Telescope find_files follow=true<cr>",  opts)
keymap("n", "<leader>g", "<cmd>Telescope live_grep<cr> ",  opts)
keymap("n", "<leader>b", "<cmd>Telescope git_branches<cr>",  opts)

-- MINI MAP
vim.keymap.set('n', '<Leader>mc', MiniMap.close)
vim.keymap.set('n', '<Leader>mf', MiniMap.toggle_focus)
vim.keymap.set('n', '<Leader>mo', MiniMap.open)
vim.keymap.set('n', '<Leader>mr', MiniMap.refresh)
vim.keymap.set('n', '<Leader>ms', MiniMap.toggle_side)
vim.keymap.set('n', '<Leader>mt', MiniMap.toggle)

-- AERIAL
vim.keymap.set("n", "<leader>a", "<cmd>AerialToggle!<CR>")
