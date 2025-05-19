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
set -o vi
alias zp="vsc $HOME/.zprofile"
alias upzp="source $HOME/.zprofile"
export MANPAGER=bat
export EDITOR=nvim
export PYTHONDONTWRITEBYTECODE=1
export CLICOLOR=1
export RIPGREP_CONFIG_PATH="$DOT_DIR/cli/.ripgreprc"
EZA_IGNORE=".DS_Store|.git|.localized|*.code-workspace|.venv"

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

alias sch="clear; mdcat $PER_DIR/people/schedule.md"
alias kb="clear; rg -UA 1 '$KB_REGEX_NOW' $DOMAINS_DIR; rg -UA 1 '$KB_REGEX_NOW' $SW_DIR; rg -UA 1 '$KB_REGEX_NOW' $PER_DIR/people"
alias kbn="clear; rg -UA 2 '$KB_REGEX_NEXT' $DOMAINS_DIR; rg -UA 1 '$KB_REGEX_NEXT' $SW_DIR; rg -UA 1 '$KB_REGEX_NEXT' $PER_DIR/people"
alias qt="clear; mdcat $MAT_DIR/sw/lang/html-css/content/about/quotes.md"
alias tz="clear; label "orangered" "WEIGHT"; cat $TRACK_DIR/weight.dat | asciigraph -h 10 -w 120 red 2>/dev/null"
alias gr="\cd $PER_DIR/tracking; gds"
alias gz="nvim $PER_DIR/tracking/24/za.dat; gr; ga; gds"
function agg(){
    # prefer this approach: partitions arts, one file instead of three
    timer;
    YEAR=${1:-24}
    DANCE="$(cat $TRACK_DIR/$YEAR/dance.dat | awk 'NF>1{print $NF}' | awk '{sum+=$1;}END{print sum/4;}')"
    SKATE="$(cat $TRACK_DIR/$YEAR/skate.dat | awk 'NF>1{print $NF}' | awk '{sum+=$1;}END{print sum/4;}')"
    GUITAR="$(cat $TRACK_DIR/$YEAR/guitar.dat | awk 'NF>1{print $NF}' | awk '{sum+=$1;}END{print sum/4;}')"
    PIANO="$(cat $TRACK_DIR/$YEAR/piano.dat | awk 'NF>1{print $NF}' | awk '{sum+=$1;}END{print sum/4;}')"
    TRAIN="$(cat $TRACK_DIR/$YEAR/train.dat | awk 'NF>1{print $NF}' | awk '{sum+=$1;}END{print sum;}')"
    echo "guitar,${GUITAR},150" | termgraph --color {green,blue}
    echo "piano,${PIANO},150" | termgraph --color {green,blue}
    echo "dance,${DANCE},150" | termgraph --color {green,blue}
    echo "skate,${SKATE},150" | termgraph --color {green,blue}
    echo "train,${TRAIN},200" | termgraph --color {green,blue}
}
function hm(){
    # TODO: branch on arg (two-digit int, string)
    if [ $# -eq 0 ]; then
        label "deeppink" "GUITAR"
        termgraph --calendar --start-dt 2024-01-01 $TRACK_DIR/24/guitar.dat
        label "darkmagenta" "PIANO"
        termgraph --calendar --start-dt 2024-01-01 $TRACK_DIR/24/piano.dat
        label "gold" "DANCE"
        termgraph --calendar --start-dt 2024-01-01 $TRACK_DIR/24/dance.dat
        label "darkorange" "SKATE"
        termgraph --calendar --start-dt 2024-01-01 $TRACK_DIR/24/skate.dat
        label "peru" "TRAIN"
        termgraph --calendar --start-dt 2024-01-01 $TRACK_DIR/24/train.dat
    else
        fname="$1.dat";
        vim $PER_DIR/tracking/24/"$fname";
        \cd $PER_DIR/tracking;
        git add -A;
        cd -;
    fi
}
function timer(){
    year_past="$(python -c 'from datetime import datetime as dt; days_past = float(abs((dt.strptime("2024-01-01", "%Y-%m-%d") - dt.today()).days)); year_past = round(days_past / 365 * 100, 2); print(year_past)')"
    target_hours="$(python -c 'from datetime import datetime as dt; days_past = float(abs((dt.strptime("2024-01-01", "%Y-%m-%d") - dt.today()).days)); target_hours = round((days_past / 365) * 150, 1); print(target_hours)')"
    label "red" "YEAR PAST: ${year_past}% ||| TARGET HOURS: ${target_hours}"
}

###
# 🚁 NAVIGATION
###

# CODE
alias vc="cd $HOME/.config/nvim/lua/zv"
alias plug="cd $HOME/.local/share/nvim/plugged"
alias ws="cd $TELESCOPE_WORKSPACE_DIR; nv"
alias ms="\cd $MAT_DIR/sw/hiring"
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
alias shu="cd $ZV_DIR/notes/bookcase"
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
alias jl="jless -r"
alias m="make"
alias mkd='function mkd(){ mkdir "$1"; cd "$1";}; mkd'
alias nv="nvim"
alias o="open"
alias oo="open ."
alias v="vimv"
alias vsc="open -a 'Visual Studio Code'"
alias vscfr="ls ~/.vscode/extensions/ > $DOT_DIR/vs-code/pkg-vsc.txt"
alias tm="b $PER_DIR/tracking/23/10.dat"
alias ytd='yt-dlp "$1"'
alias ytdv='yt-dlp --format mp4 "$1"'

# EXA
alias lh="l | head"
function l(){
    if [ "$1" ]; then
        eza -al --icons --git --git-ignore -I $EZA_IGNORE "$1"
    else
        eza -al --icons --git --git-ignore -I $EZA_IGNORE
    fi
}

function t(){
    if [ $# -eq 2 ]; then
        eza -al --icons --tree --git-ignore -I $EZA_IGNORE --level="$1" "$2"
    # t <depth>
    elif [ $# -eq 1 ]
    then
        # break on dir prepended w/ digits e.g. logs/2019
        if [[ "$1" =~ ^-?[0-9]+[.,]?[0-9]*$ ]]; then  # break on dir prepended w/ digits e.g. `logs/2019`
            eza -al --icons --tree --git-ignore -I $EZA_IGNORE --level="$1"
        else
            eza -al --icons --tree --git-ignore -I $EZA_IGNORE "$1"
        fi
    # t
    else
        eza -al --icons --tree --git-ignore -I $EZA_IGNORE
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
# eval "$(oh-my-posh init zsh --config $(brew --prefix oh-my-posh)/themes/multiverse-neon.omp.json)"

# pyenv
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init --path)"
fi

export PATH="$PATH:/Users/zach/.local/bin"  # pipx
export PATH="$DENV_DIR/bin:${PATH}"         # my bin
export PATH=$PATH:$HOME/go/bin              # golang
