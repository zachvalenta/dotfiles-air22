# pipx
export PATH="$PATH:/Users/zach/.local/bin"
# nodenv
eval "$(nodenv init -)"

# broot - which do you need
source /Users/zach/.config/broot/launcher/bash/br
source /Users/zach/Library/Application\ Support/org.dystroy.broot/launcher/bash/br

eval "$(atuin init zsh)"
export LS_COLORS="$(vivid generate catppuccin-mocha)"

# bun completions
[ -s "/Users/zach/.bun/_bun" ] && source "/Users/zach/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
