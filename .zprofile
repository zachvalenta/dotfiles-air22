###
# 🌇  PROFILE
###

echo -n "$(tput setaf 5) updating ~/.zprofile at$(tput sgr0): "; date
set -o emacs
alias zp="vim $HOME/.zprofile"
alias upzp="source $HOME/.zprofile"
export MANPAGER=bat
export EDITOR=vim

DOC_DIR="$HOME/Documents/zvroot"
MAT_DIR="$DOC_DIR/materials"
NOTE_DIR="$DOC_DIR/notes"
PER_DIR="$DOC_DIR/personal"
DEV_DIR="$DOC_DIR/materials/stem/dev"
DENV_DIR="$DEV_DIR/os/denv"
DOT_DIR="$DENV_DIR/dotfiles"

export CLICOLOR=1
export EXA_COLORS="ga=38;5;213:gm=32:*.py=38;5;114:Dockerfile=38;5;074;1:docker-compose.*=38;5;074;1:*.pdf=38;5;208:*.txt=38;5;244:*.html=38;5;137;1:*.env*=31;0;01:*.sql*=38;5;28"
export LSCOLORS=gxfxcxdxbxegedabaggagx

# powerline-shell
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

# 💡 non-fiction during meals, fiction at night
alias wf="rg 'WF' $HOME/.bash_profile -A18 -B5"

# 🌆
# alias shui="bat $CODE_DIR/lang/html-css/content/about/quotes.md"
# function nian(){
    # year="$1-year.md";
    # path="$HOME/Desktop/zvmac/personal/calendar/logs/yearly";
    # bat "$path/$year";
# }

# 🌇
alias kba="rg -UA 2 '## board\n\n[\w|\*]' $NOTE_DIR/art"
alias kbh="rg -UA 1 '## board\n\n[\w|\*]' $NOTE_DIR/humanities"
alias kbs="rg -UA 1 '## board\n\n[\w|\*]' $NOTE_DIR/stem"

###
# 🚁 NAVIGATION
###

alias b="bat"
alias notes="\cd $NOTE_DIR; jb"
alias home="cd $HOME"
alias desk="cd $HOME/Desktop"
alias vsdir="cd $HOME/Library/Application\ Support/Code/User"
alias mat="cd $MAT_DIR"
alias dev="cd $DEV_DIR"

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
alias v="vimv"
alias vsc="open -a 'Visual Studio Code'"
alias vscfr="ls ~/.vscode/extensions/ > $DOT_DIR/vs-code/pkg-vsc.txt"

###
# 💾  GIT
###

alias gb="git b"  # current branch
alias gs="git s"  # status
alias gd="git d"  # diff working directory and repo
alias gds="git ds"  # diff staging area and repo
alias gai="git ai"  # interactive stage
function ga(){  # add specific file(s) or add all (sans args)
    if [ $# -eq 0 ]; then
        read "response?Are you sure ? [y/n] "
        response=${response:l}  # to lower
        if [[ $response =~ ^(yes|y| ) ]] || [[ -z $response ]]; then
            git add -A
        fi
    else
        for var in "$@"
        do
            git add "$var"
        done
    fi
}
alias gl="git l"  # prettified log of previous 10 commits
alias gc="git c"  # commit

###
# 🛣 PATH
###

# Homebrew - set path/manpath
eval "$(/opt/homebrew/bin/brew shellenv)"

# pyenv
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init --path)"
fi

# pipx
export PATH="$PATH:/Users/zach/.local/bin"

# my bin
export PATH="$DENV_DIR/bin:${PATH}"

