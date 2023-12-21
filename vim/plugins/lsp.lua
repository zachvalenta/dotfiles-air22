local lsp_zero = require("lsp-zero")

lsp_zero.on_attach(function(client, bufnr)
  lsp_zero.default_keymaps({
    buffer = bufnr,
    -- override other plugins using same mappings as lsp-zero
    -- preserve_mappings = false
})
end)

require("mason").setup()
require("mason-lspconfig").setup({
  ensure_installed = {"marksman", "pyright"},
  handlers = {
    lsp_zero.default_setup,
  },
})
