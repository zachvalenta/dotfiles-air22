local opts = { noremap = true, silent = true }
local keymap = vim.api.nvim_set_keymap

-- LEADER
keymap("", "<Space>", "<Nop>", opts)
vim.g.mapleader = " "
vim.g.maplocalleader = " "

-- TELESCOPE
keymap("n", "<leader>f", "<cmd>Telescope find_files follow=true<cr>",  opts)
keymap("n", "<leader>g", "<cmd>Telescope live_grep<cr> ",  opts)
-- keymap("n", "<leader>gb", "<cmd>Telescope git_branches<cr>",  opts)
keymap("n", "<leader>r", "<cmd>Telescope lsp_document_symbols<cr>", opts)
keymap("n", "<leader>t", "<cmd>Telescope lsp_workspace_symbols<cr>", opts)

-- MINI MAP
-- vim.keymap.set('n', '<Leader>mc', MiniMap.close)
-- vim.keymap.set('n', '<Leader>mf', MiniMap.toggle_focus)
-- vim.keymap.set('n', '<Leader>mo', MiniMap.open)
-- vim.keymap.set('n', '<Leader>mr', MiniMap.refresh)
-- vim.keymap.set('n', '<Leader>ms', MiniMap.toggle_side)
-- vim.keymap.set('n', '<Leader>mt', MiniMap.toggle)

-- AERIAL
vim.keymap.set("n", "<leader>b", "<cmd>AerialToggle!<CR>")

-- BARBAR
vim.keymap.set("n", "<leader>h", "<cmd>BufferPrevious<CR>")
vim.keymap.set("n", "<leader>l", "<cmd>BufferNext<CR>")
vim.keymap.set("n", "<leader>1", "<cmd>BufferGoto 1<CR>")
vim.keymap.set("n", "<leader>2", "<cmd>BufferGoto 2<CR>")
vim.keymap.set("n", "<leader>3", "<cmd>BufferGoto 3<CR>")
vim.keymap.set("n", "<leader>4", "<cmd>BufferGoto 4<CR>")
vim.keymap.set("n", "<leader>5", "<cmd>BufferGoto 5<CR>")
vim.keymap.set("n", "<leader>6", "<cmd>BufferGoto 6<CR>")
vim.keymap.set("n", "<leader>7", "<cmd>BufferGoto 7<CR>")
vim.keymap.set("n", "<leader>8", "<cmd>BufferGoto 8<CR>")
vim.keymap.set("n", "<leader>9", "<cmd>BufferGoto 9<CR>")
vim.keymap.set("n", "<leader>0", "<cmd>BufferLast<CR>")
vim.keymap.set("n", "<leader>bh", "<cmd>BufferMovePrevious<CR>")
vim.keymap.set("n", "<leader>bl", "<cmd>BufferMoveNext<CR>")
vim.keymap.set("n", "<leader>bp", "<cmd>BufferPin<CR>")
