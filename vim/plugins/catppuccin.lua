require("catppuccin").setup({
    flavour = "mocha",
    integrations = {
        telescope = {
            enabled = true,
            style = "nvchad"
        }
    },
})

vim.cmd.colorscheme "catppuccin"
