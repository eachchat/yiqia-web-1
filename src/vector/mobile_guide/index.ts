import { logger } from "matrix-js-sdk/src/logger";

import { getVectorConfig } from '../getconfig';

function onBackToElementClick(): void {
    // Cookie should expire in 4 hours
    document.cookie = 'element_mobile_redirect_to_guide=false;path=/;max-age=14400';
    window.location.href = '../';
}

// NEVER pass user-controlled content to this function! Hardcoded strings only please.
function renderConfigError(message: string): void {
    const contactMsg = "If this is unexpected, please contact your system administrator " +
        "or technical support representative.";
    message = `<h2>Error loading Yiqia</h2><p>${message}</p><p>${contactMsg}</p>`;

    const toHide = document.getElementsByClassName("mx_HomePage_container");
    const errorContainers = document.getElementsByClassName(
        "mx_HomePage_errorContainer",
    ) as HTMLCollectionOf<HTMLDialogElement>;

    for (const e of toHide) {
        // We have to clear the content because .style.display='none'; doesn't work
        // due to an !important in the CSS.
        e.innerHTML = '';
    }
    for (const e of errorContainers) {
        e.style.display = 'block';
        e.innerHTML = message;
    }
}

async function initPage(): Promise<void> {
    // document.getElementById('back_to_element_button').onclick = onBackToElementClick;

    const config = await getVectorConfig('..');

    // We manually parse the config similar to how validateServerConfig works because
    // calling that function pulls in roughly 4mb of JS we don't use.

    const wkConfig = config['default_server_config']; // overwritten later under some conditions
    const serverName = config['default_server_name'];
    const defaultHsUrl = config['default_hs_url'];
    const defaultIsUrl = config['default_is_url'];

    const incompatibleOptions = [wkConfig, serverName, defaultHsUrl].filter(i => !!i);
    if (incompatibleOptions.length > 1) {
        return renderConfigError(
            "Invalid configuration: can only specify one of default_server_config, default_server_name, " +
            "or default_hs_url.",
        );
    }
    if (incompatibleOptions.length < 1) {
        return renderConfigError("Invalid configuration: no default server specified.");
    }

    let hsUrl = '';
    let isUrl = '';

    if (wkConfig && wkConfig['m.homeserver']) {
        hsUrl = wkConfig['m.homeserver']['base_url'];

        if (wkConfig['m.identity_server']) {
            isUrl = wkConfig['m.identity_server']['base_url'];
        }
    }

    if (serverName) {
        // We also do our own minimal .well-known validation to avoid pulling in the js-sdk
        try {
            const result = await fetch(`https://${serverName}/.well-known/matrix/client`);
            const wkConfig = await result.json();
            if (wkConfig && wkConfig['m.homeserver']) {
                hsUrl = wkConfig['m.homeserver']['base_url'];

                if (wkConfig['m.identity_server']) {
                    isUrl = wkConfig['m.identity_server']['base_url'];
                }
            }
        } catch (e) {
            logger.error(e);
            return renderConfigError("Unable to fetch homeserver configuration");
        }
    }

    if (defaultHsUrl) {
        hsUrl = defaultHsUrl;
        isUrl = defaultIsUrl;
    }

    if (!hsUrl) {
        return renderConfigError("Unable to locate homeserver");
    }

    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);


    if(isIos) {
        const iosAppUrl = config['mobile_ios_download_info']['url'];
        document.getElementById('step1_heading').innerHTML= '获取亿洽iOS客户端';
        (document.getElementById('download_button') as HTMLAnchorElement).href = iosAppUrl;
    }
    
    if(isAndroid) {
        const iosAppUrl = config['mobile_android_download_info']['url'];
        document.getElementById('step1_heading').innerHTML= '获取亿洽Android客户端';
        (document.getElementById('download_button') as HTMLAnchorElement).href = iosAppUrl;
    }
}

initPage();
