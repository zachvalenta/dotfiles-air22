vim.api.nvim_exec([[
  augroup markdown_comment
    autocmd!
    autocmd FileType markdown
      \ syntax match mdcomment /^>.*$/ |
      \ highlight default link mdcomment Italic |
      \ highlight mdcomment guifg=#f9e2af gui=italic
  augroup END
]], false)
