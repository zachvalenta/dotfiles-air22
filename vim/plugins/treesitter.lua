require("nvim-treesitter.configs").setup({
    sync_install = true,
    ensure_installed = {
        "c", "lua", "vim", "vimdoc", "query",
        "bash", "csv", "dockerfile", "go", "python", "sql", "yaml"
    },
    highlight = {
        enable = true,
        additional_vim_regex_highlighting = false,
    },
})
