local options = {
    cursorline = true,         -- highlight the current line
    relativenumber = true,     -- set relative numbered lines
    termguicolors = true,
    colorscheme = rigel,
}

for k, v in pairs(options) do
    vim.opt[k] = v
end
