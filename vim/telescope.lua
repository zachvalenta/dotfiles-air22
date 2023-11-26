require("telescope").setup{
    defaults = {
        layout_config = {
            height = 0.99,
            width = 0.99,
            horizontal = {
                prompt_position = "top",
                preview_width = 0.7,
                results_width = 0.3,
            },
        },
        vimgrep_arguments = {
            "rg",
            "--color=never",
            "--no-heading",     -- don't group matches by file
            "--with-filename",  -- print filename
            "--line-number",    -- print line number
            "--column",         -- show column numbers
            "--smart-case",     -- search by case only if query has capitalization
            "--follow",         -- follow symlinks
        },
    }
}
