FROM  ubuntu:latest
LABEL author=jinmu333

USER root

ENV LANG C.UTF-8
RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list && \
    sed -i s/security.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install sudo curl zsh wget nano psmisc -y
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install screenfetch git -y
ENV SHELL=/bin/zsh
RUN git clone git://github.com/robbyrussell/oh-my-zsh.git --depth=1 ~/.oh-my-zsh && \
    cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install nodejs npm -y
RUN npm install -g npm --registry=https://registry.npm.taobao.org
RUN npm install n -g --registry=https://registry.npm.taobao.org
RUN export N_NODE_MIRROR=https://npm.taobao.org/mirrors/node && n 13
RUN node -v && npm -v
RUN npm install -g @vue/cli --registry=https://registry.npm.taobao.org
RUN apt-get update -y && apt-get upgrade -y
RUN rm -rf /root/.cache/ /opt/install
ENTRYPOINT []

WORKDIR /opt/vue_demo/
