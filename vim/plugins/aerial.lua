require("aerial").setup({
    backends = { "treesitter" },
    open_automatic = true,
    layout = {
        default_direction = "prefer_left",
        width = 0.20,
    },
    -- optionally use on_attach to set keymaps when aerial has attached to a buffer
    on_attach = function(bufnr)
      -- Jump forwards/backwards with '{' and '}'
    --   vim.keymap.set("n", "{", "<cmd>AerialPrev<CR>", { buffer = bufnr })
    --   vim.keymap.set("n", "}", "<cmd>AerialNext<CR>", { buffer = bufnr })
    end,
})
