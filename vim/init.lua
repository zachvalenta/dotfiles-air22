-- LOAD PLUGINS
vim.cmd [[source ~/.config/nvim/lua/zv/plugin_load.vim]]

-- CONFIG PLUGINS
require "zv.telescope"
require "zv.catppuccin"
require "zv.mini_indentscope"
require "zv.mini_autopair"
require "zv.mini_map"

-- USER CONFIG
require "zv.option"
require "zv.keymap"
require "zv.markdown_fmt"  -- has to follow catppuccin
