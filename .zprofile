###
# 🗂 FS
###

# MACHINE-SPECIFIC
DOC_DIR="$HOME/Documents"
DENV_DIR="$DOC_DIR/denv"
DOT_DIR="$DENV_DIR/dotfiles"
TELESCOPE_WORKSPACE_DIR="$HOME/Documents/telescope-workspace"

# ME
ZV_DIR="$HOME/Documents/zv"
MAT_DIR="$ZV_DIR/materials"
DOMAINS_DIR="$ZV_DIR/notes/domains"
SW_DIR="$ZV_DIR/notes/sw"
PER_DIR="$ZV_DIR/personal"
TRACK_DIR="$ZV_DIR/personal/tracking"
KB_REGEX_NOW="## now\n\n[\w|\*]"
KB_REGEX_NEXT="## next\n\n[\w|\*]"

###
# 🌇  PROFILE
###

echo -n "$(tput setaf 5) updating ~/.zprofile at$(tput sgr0): "; date
set -o emacs
alias zp="vsc $HOME/.zprofile"
alias upzp="source $HOME/.zprofile"
export MANPAGER=bat
export EDITOR=nvim
export PYTHONDONTWRITEBYTECODE=1
export CLICOLOR=1
export EXA_COLORS="ga=38;5;213:gm=32:*.py=38;5;114:Dockerfile=38;5;074;1:docker-compose.*=38;5;074;1:*.pdf=38;5;208:*.txt=38;5;244:*.html=38;5;137;1:*.env*=31;0;01:*.sql*=38;5;28"
export LSCOLORS=gxfxcxdxbxegedabaggagx
export RIPGREP_CONFIG_PATH="$DOT_DIR/.ripgreprc"

# POWERLINE-SHELL
function powerline_precmd() {
    PS1="$(powerline-shell --shell zsh $?)"
}
function install_powerline_precmd() {
  for s in "${precmd_functions[@]}"; do
    if [ "$s" = "powerline_precmd" ]; then
      return
    fi
  done
  precmd_functions+=(powerline_precmd)
}
if [ "$TERM" != "linux" ]; then
    install_powerline_precmd
fi

###
# 🏔 WORKFLOW
###

alias wf="rg 'WF' $HOME/.zprofile -A18 -B5"
alias sch="clear; bat $PER_DIR/people/schedule.md"

alias kb="clear; rg -UA 1 '$KB_REGEX_NOW' $DOMAINS_DIR; rg -UA 1 '$KB_REGEX_NOW' $SW_DIR; rg -UA 1 '$KB_REGEX_NOW' $PER_DIR/people"
alias kbn="clear; rg -UA 2 '$KB_REGEX_NEXT' $DOMAINS_DIR; rg -UA 1 '$KB_REGEX_NEXT' $SW_DIR; rg -UA 1 '$KB_REGEX_NEXT' $PER_DIR/people"
alias wen="rg -A 5 KATA $DOMAINS_DIR/art/aesthetics.md"
alias qt="clear; bat $MAT_DIR/sw/lang/html-css/content/about/quotes.md"
alias tz="clear; label "orangered" "WEIGHT"; cat $TRACK_DIR/weight.dat | asciigraph -h 10 -w 120 red 2>/dev/null"
alias tm="bat $TRACK_DIR/23/12.dat"  # why is this opening broot?

###
# 🚁 NAVIGATION
###

# CODE
alias vc="cd $HOME/.config/nvim/lua/zv"
alias plug="cd $HOME/.local/share/nvim/plugged"
alias ws="cd $TELESCOPE_WORKSPACE_DIR; nv"
alias ms="\cd $MAT_DIR/sw/hiring; broot"
alias denv="cd $DENV_DIR"
alias bin="cd $DENV_DIR/bin"
alias dot="cd $DOT_DIR"
alias brewfr="brew ls --versions > $DENV_DIR/logs/brew/brew-pkgs.txt"
alias vsdir="cd $HOME/Library/Application\ Support/Code/User"
alias snip="cd $HOME/Library/Application\ Support/Code/User/snippets"

# ROOT
alias home="cd $HOME"
alias desk="cd $HOME/Desktop"
alias zv="cd $ZV_DIR"

# DOCS
alias dom="\cd $DOMAINS_DIR; jbdom"
alias sw="\cd $SW_DIR; jbsw"
alias shu="cd $ZV_DIR/notes/bookcase; br"
alias mat="cd $MAT_DIR; t 2"
alias yin="cd $ZV_DIR/yin"
alias per="cd $PER_DIR"
alias logs="cd $PER_DIR/logs"
alias ml="cd $MAT_DIR/music/za/music-library; nv README.md"
alias ren="cd $PER_DIR/people"

###
# 🛠 UTILS
###

alias b="br"
alias bpy="bpython"
alias cd='function cdl(){ cd "$1"; pwd; l;}; cdl'
alias cppath='pwd | pbcopy'
alias ic="imgcat"
alias gr="\cd $PER_DIR/tracking; gds"
alias gz="nvim $PER_DIR/tracking/23/11.dat; gr; ga; gds"
alias m="make"
alias mkd='function mkd(){ mkdir "$1"; cd "$1";}; mkd'
alias nv="nvim"
alias o="open"
alias oo="open ."
alias v="vimv"
alias vsc="open -a 'Visual Studio Code'"
alias vscfr="ls ~/.vscode/extensions/ > $DOT_DIR/vs-code/pkg-vsc.txt"
alias tm="b $PER_DIR/tracking/23/10.dat"

# EXA
alias lh="l | head"
function l(){
    if [ "$1" ]; then
        exa -al --icons --classify --git --git-ignore -I '.git|.DS_Store' "$1" 
    else
        exa -al --icons --classify --git --git-ignore -I '.git|.DS_Store'
    fi
}
function ll(){
    if [ "$1" ]; then
        exa --icons --classify --git -I '.git|.DS_Store|.localized' "$1"
    else
        exa --icons --classify --git -I '.git|.DS_Store|.localized'
    fi
}
function t(){
    # t <depth> <dir>
    if [ $# -eq 2 ]; then
        exa -al --icons --tree --level="$1" --git-ignore -I '.git|.DS_Store' "$2"
    # t <depth>
    elif [ $# -eq 1 ]
    then
        # break on dir prepended w/ digits e.g. logs/2019
        if [[ "$1" =~ ^-?[0-9]+[.,]?[0-9]*$ ]]; then  # break on dir prepended w/ digits e.g. `logs/2019`
            exa -al --icons --tree --level="$1" --git-ignore -I '.git|.DS_Store'
        else
            exa -al --icons --tree --git-ignore -I '.git|.DS_Store' "$1"
        fi
    # t
    else
        exa -al --icons --tree --git-ignore -I '.git|.DS_Store'
    fi
}

function kai(){
    fname="$1.md";
    cwd="$(pwd)";
    touch "$cwd/$fname";
    open "$cwd/$fname";
}

function label(){
    update_bg="$1"
    update_fg="$(pastel textcolor "$update_bg")"
    echo -en "\n"
    pastel paint "$update_fg" --on "$update_bg" "$2"
    echo -en "\n"
}

###
# 💾  GIT
###

alias gb="git b"         # current branch
alias gs="clear; git s"  # status
alias gd="git d"         # diff working directory and repo
alias gds="git ds"       # diff staging area and repo
alias gai="git ai"       # interactive stage
alias ga="git add -A"    # add all
alias gl="git l"         # prettified log of previous 10 commits
alias gc="git c"         # commit
alias gca="git c --amend"  # commit amend
alias gcne="git c --amend --no-edit"  # commit amend
alias gshow="git log --format=%B -n 1"  # msg description for commit

###
# 🛣 PATH
###

# Homebrew - set path/manpath
eval "$(/opt/homebrew/bin/brew shellenv)"

# pyenv
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init --path)"
fi

export PATH="$PATH:/Users/zach/.local/bin"  # pipx
export PATH="$DENV_DIR/bin:${PATH}"         # my bin
export PATH=$PATH:$HOME/go/bin              # golang
