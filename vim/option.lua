local options = {
    cursorline = true,         -- highlight cursor line
    relativenumber = true,     -- relative line number
}

for k, v in pairs(options) do
    vim.opt[k] = v
end
