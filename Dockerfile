FROM node:20-alpine

RUN apk add --no-cache git
RUN git config --global --add safe.directory /web

WORKDIR /web

EXPOSE 80

CMD ["sh"]