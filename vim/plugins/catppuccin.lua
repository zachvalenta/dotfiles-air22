require("catppuccin").setup({
    flavour = "mocha",
    integrations = {
        treesitter = true,
        telescope = {
            enabled = true,
            style = "nvchad"
        }
    },
})

vim.cmd.colorscheme "catppuccin"
