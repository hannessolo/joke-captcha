FROM tensorflow/tensorflow:1.15.2-py3

ENV LANG=C.UTF-8
RUN pip3 install gpt-2-simple Flask
RUN apt-get -y update && \
    apt-get -y install build-essential && \
    curl -sL https://deb.nodesource.com/setup | bash - && \
    apt-get install -y nodejs

COPY . /app

WORKDIR /app

CMD ["env", "FLASK_APP=server.py", "flask", "run", "--host", "0.0.0.0"]
EXPOSE 5000
