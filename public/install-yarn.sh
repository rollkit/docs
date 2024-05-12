#!/bin/sh

set -e

INSTALL_NODE_VER=21.7.2
INSTALL_NVM_VER=0.39.7
INSTALL_YARN_VER=1.22.19

# You can pass node and yarn versions as arguments to this script
if [ "$1" != '' ]; then
	echo "==> Using specified node version - $1"
	INSTALL_NODE_VER=$1
fi
if [ "$2" != '' ]; then
	echo "==> Using specified yarn version - $2"
	INSTALL_YARN_VER=$2
fi



echo "==> Ensuring .bashrc exists and is writable"
touch ~/.bashrc

echo "==> Installing node version manager (NVM). Version $INSTALL_NVM_VER"
# Removed if already installed
rm -rf ~/.nvm
# Unset exported variable
export NVM_DIR=

# Install nvm 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v$INSTALL_NVM_VER/install.sh | bash
# Make nvm command available to terminal
source ~/.nvm/nvm.sh

echo "==> Installing node js version $INSTALL_NODE_VER"
nvm install $INSTALL_NODE_VER

echo "==> Make this version system default"
nvm alias default $INSTALL_NODE_VER
nvm use default

echo "==> Installing Yarn package manager"
rm -rf ~/.yarn
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version $INSTALL_YARN_VER

echo "==> Adding Yarn and Node to environment path"
# Yarn configurations
mv $HOME/.nvm/versions/node/v$INSTALL_NODE_VER/bin/node $HOME/.yarn/bin

export PATH="$HOME/.yarn/bin:$PATH"
yarn config set prefix ~/.yarn -g

echo "==> Checking for versions"
nvm --version
node --version
npm --version
yarn --version

echo "==> Print binary paths"
which npm
which node
which yarn

echo "==> List installed node versions"
nvm ls

nvm cache clear
echo "==> Now you're all setup and ready for development. If changes are yet totake effect, I suggest you restart your computer"
