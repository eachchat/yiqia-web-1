1. config.json
    disable_login_language_selector: forbidden user to change app language
    settingDefaults:
        showCommunitiesInsteadOfSpaces: which make the communities instead of space bar in left.Conbine with tagpanel.enableTagPanel and UIFeature.communities to hide the left bar.
        TagPanel.enableTagPanel: to hide the left bar combinde with showCommunitiesInsteadOfSpaces
        UIFeature.communities: false,
        language: which set the default language to zh-hans
        UIFeature.deactivate: which hide the user deactivate 
        UIFeature.passwordReset: which hide the password reset
        UIFeature.registration: which hide the registration
        UIFeature.feedback: which hide the feedback in user context menu and the feedback section in setting panel is controled by bug_report_endpoint_url configure items
        MessageComposerInput.showStickersButton: which hide the sticker in input component
        UIFeature.shareQrCode: which hide the qrcode share
        UIFeature.flair: which hide the flair
        UIFeature.advancedSettings: which can hide the setting panel security tab advance settings include ignored users panel, invites panel, e2e panel
        breadcrumbs: which hide the shortcuts to recently viewed rooms above the room list
        UIFeature.widgets: widgets bridges & bots. this can hide the room set panel but can not hide the room header context
        UIFeature.messageReport: which hide the message context menu report item
        UIFeature.messageViewSource: which hide the message context menu view source item
        UIFeature.canChangePassword: which hide the change password in setting panel
        UIFeature.canChangeLanguage: which hide the language select in setting panel
    bug_report_endpoint_url: set empty which can hide the bug report section in setting panel
    piwik: which can hide the setting panel security tab privacy section and analytics, we set it empty
    defaultCountryCode: set default country to cn
        ***************************yiqia add config**********************************************************
        EnableEncrypt: Which should hide all the encrypt function and ui features enclude cryptoEvent info, room security setting, app security setting, room avatar encurity show
                In here we thought that the encrypt is one features of the app and we the app should have the power to decide whether the app need the feature whenever the homeserver support is.
        UIFeature.conferenceEnabled: which set the voip visible in room
