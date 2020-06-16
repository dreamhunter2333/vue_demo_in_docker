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

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get install gnupg -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install yarn -y
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn global add @vue/cli
RUN apt-get update -y && apt-get upgrade -y
RUN rm -rf /root/.cache/
ENTRYPOINT []

WORKDIR /opt/vue_project/
