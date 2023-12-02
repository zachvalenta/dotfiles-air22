-- quote: angle bracket + text
vim.api.nvim_exec([[
  augroup markdown_quote
    autocmd!
    autocmd FileType markdown
      \ syntax match mdquote /^>.*$/ |
      \ highlight default link mdquote Italic |
      \ highlight mdquote guifg=#f9e2af gui=italic
  augroup END
]], false)

-- list: asterisk + text
vim.api.nvim_exec([[
  augroup markdown_list
    autocmd!
    autocmd FileType markdown
      \ syntax match mdlist /^\*\s.*$/ |
      \ highlight mdlist ctermfg=red guifg=#FF0000
  augroup END
]], false)
