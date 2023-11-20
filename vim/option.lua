local options = {
    cursorline = true,         -- highlight the current line
    relativenumber = true,     -- set relative numbered lines
}

for k, v in pairs(options) do
    vim.opt[k] = v
end
