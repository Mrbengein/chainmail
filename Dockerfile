FROM alpine
RUN adduser --disabled-password bengein
COPY entrypoint.sh /
CMD ["bonjour"]
ENTRYPOINT ["/entrypoint.sh"]
