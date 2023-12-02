-- comment text
vim.api.nvim_exec([[
  augroup markdown_comment
    autocmd!
    autocmd FileType markdown
      \ syntax match mdcomment /^>.*$/ |
      \ highlight default link mdcomment Italic |
      \ highlight mdcomment guifg=#f9e2af gui=italic
  augroup END
]], false)

-- list text
vim.api.nvim_exec([[
  augroup markdown_highlight_asterisk
    autocmd!
    autocmd FileType markdown
      \ syntax match markdownAsterisk /^\*\s.*$/ |
      \ highlight markdownAsterisk ctermfg=red guifg=#FF0000
  augroup END
]], false)
