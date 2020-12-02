## Description
A template repository for setting up a load testing tool called k6 and visualizing it later using grafana.
K6 is not as feature rich as JMeter, but is one of the fastest load testing tools. See here for more [comparison](https://k6.io/blog/comparing-best-open-source-load-testing-tools) of different tools.

## References
- https://docs.k6.io/docs/running-k6
- https://grafana.com/
- https://github.com/statsd/statsd
- https://k6.io/blog/how-to-do-10-things-in-jmeter-vs-k6

##  Installation
```$xslt
npm install
brew tap loadimpact/k6
brew install k6
docker-compose up
```

## Setup Grafana Data Source
1. Visit *http://localhost:3000* on your browser. Login using credentials: admin/password
2. On left hand panel, click on the gear and set up data source.
- ![datasource](./assets/datasource.png)

3. Enter the data source information and save.
- ![datasource](./assets/graphite.png)
4. (Optional) - Import some [nifty dashboards](https://grafana.com/grafana/dashboards/2587) into your grafana.

##  Running Tests
```
# Creates k6 as the namespace when using grafana or graphite
k6 run src/run.js --out statsd
# If you want to change statsd namespace
K6_STATSD_ADDR='localhost:8125' K6_STATSD_NAMESPACE='custom_name_space' k6 run src/run.js --out statsd
```
