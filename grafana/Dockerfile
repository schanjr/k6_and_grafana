FROM grafana/grafana:8.2.6

ENV GF_SECURITY_ADMIN_USER=${GF_SECURITY_ADMIN_USER}
ENV GF_SECURITY_ADMIN_PASSWORD=${GF_SECURITY_ADMIN_PASSWORD}
USER root

COPY ./provisioning /etc/grafana/provisioning
COPY ./grafana.ini /etc/grafana/grafana.ini
COPY ./dashboards /var/lib/grafana/dashboards

#ARG GF_INSTALL_IMAGE_RENDERER_PLUGIN="true"
RUN if [ $GF_INSTALL_IMAGE_RENDERER_PLUGIN = "true" ]; then \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories && \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk --no-cache  upgrade && \
    apk add --no-cache udev ttf-opensans chromium && \
    rm -rf /tmp/* && \
    rm -rf /usr/share/grafana/tools/phantomjs; \
fi
ENV GF_RENDERER_PLUGIN_CHROME_BIN="/usr/bin/chromium-browser"
RUN if [ $GF_INSTALL_IMAGE_RENDERER_PLUGIN = "true" ]; then \
    grafana-cli \
        --pluginsDir "$GF_PATHS_PLUGINS" \
        --pluginUrl https://github.com/grafana/grafana-image-renderer/releases/latest/download/plugin-linux-x64-glibc-no-chromium.zip \
        plugins install grafana-image-renderer; \
fi


# Install plugins
# To install grafana standard plugin

# World map Panel
RUN #/usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install grafana-worldmap-panel
## PieChart Panel
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install grafana-piechart-panel
## diagraam Panel
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install jdbranham-diagram-panel
## grafana-clock-panel
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install grafana-clock-panel
## natel-plotly-panel
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install natel-plotly-panel
## alarm-box
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install btplc-alarm-box-panel
## breadcrumb
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install digiapulssi-breadcrumb-panel
## boomtable
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install yesoreyeram-boomtable-panel
## Bubbleechart
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install digrich-bubblechart-panel
## Carpelplot
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install petrslavotinek-carpetplot-panel
## Histogram
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install mtanda-histogram-panel
## PolyStat
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install grafana-polystat-panel
## Heatmap by Savently
#RUN /usr/share/grafana/bin/grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install savantly-heatmap-panel
## TrafficLights
#RUN /usr/share/grafana/bin/``````grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install snuids-trafficlights-panel

# To install third party plugin
# RUN /usr/share/grafana/bin/grafana-cli --pluginUrl "${pluginUrl}" --pluginsDir "${GF_PATHS_PLUGINS}" plugins install ${pluginWithoutUrl}

