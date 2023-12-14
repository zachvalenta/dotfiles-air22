-- PLUGINS
vim.cmd [[source ~/.config/nvim/lua/zv/plugin.vim]]
require "zv.telescope"
require "zv.catppuccin"
require "zv.mini_indentscope"

-- CORE
require "zv.option"
require "zv.keymap"
require "zv.markdown_fmt"  -- has to follow catppuccin
