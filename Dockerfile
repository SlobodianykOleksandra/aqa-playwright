FROM mcr.microsoft.com/playwright:v1.40.0-jammy

RUN mkdir playwright-tests

COPY . /playwright-tests

WORKDIR /playwright-tests

RUN npm ci

CMD ["npm", "test"]