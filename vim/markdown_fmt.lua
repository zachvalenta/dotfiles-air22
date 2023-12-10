-- LIST: ASTERISK + TEXT
-- alternate colors: eab700, f5e0dc
vim.api.nvim_exec([[
  augroup markdown_list
    autocmd!
    autocmd FileType markdown
      \ syntax match mdlist /^\*\s.*$/ |
      \ highlight mdlist guifg=#eab700
  augroup END
]], false)

-- COMMENT: ANGLE BRACKET + TEXT
vim.api.nvim_exec([[
  augroup markdown_comment
    autocmd!
    autocmd FileType markdown
      \ syntax match mdquote /^>.*$/ |
      \ highlight default link mdquote Italic |
      \ highlight mdquote guifg=#6c7086 gui=italic
  augroup END
]], false)
