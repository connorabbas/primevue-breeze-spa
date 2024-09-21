# For development, not production
FROM node:20-alpine

USER root
RUN apk add --no-cache git

USER node
RUN git config --global --add safe.directory /web

WORKDIR /web

EXPOSE 80

CMD ["sh"]
