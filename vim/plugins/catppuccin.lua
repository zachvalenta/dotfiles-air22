require("catppuccin").setup({
    flavour = "mocha",
    integrations = {
        barbar = true,
        treesitter = true,
        telescope = {
            enabled = true,
            style = "nvchad"
        }
    },
})

vim.cmd.colorscheme "catppuccin"
