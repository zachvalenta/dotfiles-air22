-- PLUGINS
vim.cmd [[source ~/.config/nvim/lua/zv/plugin.vim]]
require "zv.telescope"
require "zv.catppuccin"

-- CORE
require "zv.option"
require "zv.keymap"
require "zv.markdown_fmt"  -- has to follow catppuccin
