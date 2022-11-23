###
# 🌇  PROFILE
###

echo -n "$(tput setaf 5) updating ~/.zprofile at$(tput sgr0): "; date
alias zp="vim $HOME/.zprofile"
alias upzp="source $HOME/.zprofile"

DOC_DIR="/Users/zach/Documents/zvroot"
MAT_DIR="$DOC_DIR/materials"
NOTE_DIR="$DOC_DIR/notes"
PER_DIR="$DOC_DIR/personal"
DEV_DIR="$DOC_DIR/materials/stem/dev"
DENV_DIR="$DEV_DIR/os/denv"
DOT_DIR="$DENV_DIR/dotfiles"

export CLICOLOR=1
export EXA_COLORS="ga=38;5;213:gm=32:*.py=38;5;114:Dockerfile=38;5;074;1:docker-compose.*=38;5;074;1:*.pdf=38;5;208:*.txt=38;5;244:*.html=38;5;137;1:*.env*=31;0;01:*.sql*=38;5;28"
export LSCOLORS=gxfxcxdxbxegedabaggagx

###
# 🚁 NAVIGATION
###

alias notes="cd $NOTE_DIR"
alias home="cd $HOME"
alias desk="cd $HOME/Desktop"

# code
alias denv="cd $DENV_DIR"
alias bin="cd $DENV_DIR/bin"
alias dot="cd $DOT_DIR"
alias logs="cd $DENV_DIR/logs"

###
# 🛠 UTILS
###

# exa
alias lh="l | head"
function l(){
    if [ "$1" ]; then
        exa -al --classify --git --git-ignore -I '.git|.DS_Store' "$1" 
    else
        exa -al --classify --git --git-ignore -I '.git|.DS_Store'
    fi
}
function ll(){
    if [ "$1" ]; then
        exa --classify --git -I '.git|.DS_Store|.localized' "$1"
    else
        exa --classify --git -I '.git|.DS_Store|.localized'
    fi
}
function t(){
    # t <depth> <dir>
    if [ $# -eq 2 ]; then
        exa -al --tree --level="$1" --git-ignore -I '.git|.DS_Store' "$2"
    # t <depth>
    elif [ $# -eq 1 ]
    then
        # break on dir prepended w/ digits e.g. logs/2019
        if [[ "$1" =~ ^-?[0-9]+[.,]?[0-9]*$ ]]; then  # break on dir prepended w/ digits e.g. `logs/2019`
            exa -al --tree --level="$1" --git-ignore -I '.git|.DS_Store'
        else
            exa -al --tree --git-ignore -I '.git|.DS_Store' "$1"
        fi
    # t
    else
        exa -al --tree --git-ignore -I '.git|.DS_Store'
    fi
}

alias cd='function cdl(){ cd "$1"; pwd; l;}; cdl'
alias cppath='pwd | pbcopy'
alias m="make"
alias mkd='function mkd(){ mkdir "$1"; cd "$1";}; mkd'
alias o="open"
alias oo="open ."

###
# 🛣 PATH
###

# Homebrew - set path/manpath
eval "$(/opt/homebrew/bin/brew shellenv)"

# pyenv
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init --path)"
fi
