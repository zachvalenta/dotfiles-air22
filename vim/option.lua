local options = {
    cursorline = true,         -- highlight cursor line
    relativenumber = true,     -- relative line number
    ignorecase = true,         -- need to set for smartcase
    smartcase = true,          -- same as rg i.e. insensitive if query lowercase, sensitive if upper
}

for k, v in pairs(options) do
    vim.opt[k] = v
end
