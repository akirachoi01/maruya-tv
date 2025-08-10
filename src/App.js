import React, { useState, useEffect, useRef } from 'react';

// Hardcoded channel data, cleaned and consolidated from the user's provided list
const channelList = [
  {
    "name": "Kapamilya Channel",
    "group": "Converge",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Kapamilya_Channel_Logo_2020.svg/2560px-Kapamilya_Channel_Logo_2020.svg.png",
    "urls": [
      { "url": "http://143.44.136.110:6910/001/2/ch00000090990000001248/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" },
      { "url": "http://143.44.136.110:6910/001/2/ch00000090990000001286/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" }
    ]
  },
  {
    "name": "PBO",
    "group": "Converge",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pinoy_Box_Office_logo.svg/1200px-Pinoy_Box_Office_logo.svg.png",
    "urls": [
      { "url": "http://143.44.136.113:6910/001/2/ch00000090990000001078/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-04-prod.akamaized.net/out/u/pbo_sd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "DZMM Teleradyo",
    "group": "Converge",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/DZMM_TeleRadyo.svg/1200px-DZMM_TeleRadyo.svg.png",
    "urls": [
      { "url": "http://143.44.136.110:6910/001/2/ch00000090990000001249/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" }
    ]
  },
  {
    "name": "ANC",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "urls": [
      { "url": "http://143.44.136.110:6910/001/2/ch00000090990000001274/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" },
      { "url": "https://vthanh.utako.moe/wcinema/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://cors.jugorder.de/https://tr.live.cdn.cgates.lt/live/dash/561206/index.mpd", "drm": null },
      { "url": "https://rt-rtd.rttv.com/dvr/rtdoc/playlist.m3u8", "drm": null },
      { "url": "https://vthanh.utako.moe/toei/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "MYX Philippines",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "urls": [
      { "url": "http://143.44.136.111:6910/001/2/ch00000090990000001252/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" }
    ]
  },
  {
    "name": "GMA 7",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "urls": [
      { "url": "http://143.44.136.110:6910/001/2/ch00000090990000001093/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" }
    ]
  },
  {
    "name": "GTV",
    "group": "Converge",
    "logo": "https://i.imgur.com/meqX8zC.png",
    "urls": [
      { "url": "http://143.44.136.110:6910/001/2/ch00000090990000001143/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" }
    ]
  },
  {
    "name": "ALL TV",
    "group": "Converge",
    "logo": "https://brandlogo.org/wp-content/uploads/2024/05/All-TV-Logo-300x300.png.webp",
    "urls": [
      { "url": "http://143.44.136.110:6910/001/2/ch00000090990000001179/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" }
    ]
  },
  {
    "name": "Bilyonaryo Channel",
    "group": "Converge",
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxvjeBIthYiEaZHeVeYpDicIlOTdv3G6lzoal3VM2xVzWu_J7XxM657oz&s=10",
    "urls": [
      { "url": "http://143.44.136.111:6910/001/2/ch00000090990000001124/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-05-prod.akamaized.net/out/u/bilyonaryoch.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "TV5",
    "group": "Converge",
    "logo": "https://static.wikia.nocookie.net/russel/images/7/7a/TV5_HD_Logo_2024.png/revision/latest/scale-to-width-down/290?cb=20240202141126",
    "urls": [
      { "url": "http://143.44.136.111:6910/001/2/ch00000090990000001088/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/cg_hbosign.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "A2Z",
    "group": "Converge",
    "logo": "https://static.wikia.nocookie.net/russel/images/8/85/A2Z_Channel_11_without_Channel_11_3D_Logo_2020.png/revision/latest?cb=20231101144828",
    "urls": [
      { "url": "http://143.44.136.113:6910/001/2/ch00000090990000001087/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "widevine" }
    ]
  },
  {
    "name": "LOTUS MACAU",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=LM",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/5/out/u/dash/HBOPLUSHD/default.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/lotusmacau_prd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "ESPN 3",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=E3",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/5/out/u/dash/HBOPOPHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "BLOOMBERG",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BL",
    "urls": [
      { "url": "https://vthanh.utako.moe/green/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://live-atv-cdn.izzigo.tv/1/out/u/dash/DISCOVERYKIDSHD/default.mpd", "drm": "clearkey" },
      { "url": "https://9769bd6405b245ea9adca1889a0b491b.mediatailor.us-east-1.amazonaws.com/v1/master/f4e8c53a8367a5b58e20ce054ea3ce25a3e904d1/Samsung-in_BilliardTV/playlist.m3u8", "drm": null }
    ]
  },
  {
    "name": "NET25",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=N25",
    "urls": [
      { "url": "https://uselector.cdn.intigral-ott.net/MBMH/MBMH.isml/manifest.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/cg_cinemax.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "HALLYPOP",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HPOP",
    "urls": [
      { "url": "https://cdn4.skygo.mn/live/disk1/Cartoon_Network/HLSv3-FTA/Cartoon_Network.m3u8", "drm": null }
    ]
  },
  {
    "name": "TVBS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TVBS",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/3/out/u/dash/SKYSPORTSHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "HBO HITS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HH",
    "urls": [
      { "url": "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg01006-abs-cbn-anc-global-dash-abscbnono/index.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2601/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "HORIZON SPORTS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HS",
    "urls": [
      { "url": "https://jmp2.uk/sam-ITBA1500002UB.m3u8", "drm": null },
      { "url": "https://vthanh.utako.moe/wprime/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "TVB CLASSIC",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TC",
    "urls": [
      { "url": "https://vthanh.utako.moe/bs10/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "TMC",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TMC",
    "urls": [
      { "url": "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/viva_sd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "ASTRO SHOWCASE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=AS",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/4/out/u/dash/MTV80SSD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "GOLDEN NATION NETWORK",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=GNN",
    "urls": [
      { "url": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_1660.m3u8?xtreamiptv.m3u8", "drm": null },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/tepjqej1ys/out/v1/c9c9159baee749a19612b1598495859a/cenc.mpd", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_fashiontvhd.mpd", "drm": "clearkey" },
      { "url": "https://vthanh.utako.moe/bs10_star/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://cors.jugorder.de/https://tr.live.cdn.cgates.lt/live/dash/561305/index.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "UNIVERSAL TV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=UTV",
    "urls": [
      { "url": "https://otte.live.cf.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/1hz9ifohl2/out/v1/ac9abc088bfa42d49218644005535e02/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "DREAMWORKS (TAG)",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=DW",
    "urls": [
      { "url": "https://vthanh.utako.moe/bsasahi/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-08-prod.akamaized.net/out/u/cg_hgtv_hd1.mpd", "drm": "clearkey" },
      { "url": "https://linear417-gb-hls1-prd-ak.cdn.skycdp.com/100e/Content/HLS_001_1080_30/Live/channel(skynews)/index_1080-30.m3u8", "drm": null },
      { "url": "https://ott.udptv.com/stream/udptv/go3sport2/master.m3u8?u=discord.gg/civ4&p=b48a689eecee46d3167cbb669dddcd7f2e9f877b9ed7ee2bcc5bdfd0ca930ffd", "drm": null },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001098/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001286/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "HBO POP",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HP",
    "urls": [
      { "url": "https://vthanh.utako.moe/BS11/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/4zkafrcxji/out/v1/810ebca1aff0443da717da4acdeda158/cenc.mpd", "drm": "widevine" },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/i2pcjr4pe5/out/v1/912e9db56d75403b8a9ac0a719110f36/cenc.mpd", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_hbohits.mpd", "drm": null },
      { "url": "https://vthanh.utako.moe/bsp4k/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "DISNEY XD",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=DXD",
    "urls": [
      { "url": "https://vthanh.utako.moe/gaora/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2600/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "NOW 70S",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=70S",
    "urls": [
      { "url": "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/lotusmacau_prd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "GALAXY PREMIUM",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=GP",
    "urls": [
      { "url": "https://tglmp04.akamaized.net/out/v1/61b00aa312c84a0b988dc000d37926db/manifest.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "WOWOW CINEMA",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=WC",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/2/out/u/dash/UNIVERSALCINEMAHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "BEIN SPORTS 1",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BS1",
    "urls": [
      { "url": "https://vthanh.utako.moe/skya/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://ott.udptv.com/stream/udptv/go3sportopen/master.m3u8?u=discord.gg/civ4&p=b48a689eecee46d3167cbb669dddcd7f2e9f877b9ed7ee2bcc5bdfd0ca930ffd", "drm": null }
    ]
  },
  {
    "name": "MTV 80S",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=M80",
    "urls": [
      { "url": "https://vthanh.utako.moe/js1/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/900/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "NHK WORLD JAPAN",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=NHK",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5171/default_ott.mpd", "drm": "widevine" },
      { "url": "https://ilglobotv-live.akamaized.net/channels/RAIItaliaSudAfrica/Live.m3u8", "drm": null },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001179/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": null },
      { "url": "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/u142pfptsm/out/v1/1caa3b2dfa9e448d8f61209bdfc1acdc/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "KNOWLEDGE CHANNEL",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=KC",
    "urls": [
      { "url": "https://vthanh.utako.moe/familygeki/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_tvnpre.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "BLAST SPORTS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BS",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2303/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "FAMILY GEKIJYO",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=FG",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001103/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "Music",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=M",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5018/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "SOLAR SPORTS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=SS",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/wwinlbo2f3/out/v1/3f77baf7841a4fdeb9001961b9541a08/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "PREMIER SPORTS 2",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=PS2",
    "urls": [
      { "url": "https://streams2.sofast.tv/ptnr-yupptv/title-BABYFIRST-ENG_YuppTV/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/c8d16110-566c-4e95-a1df-55d175e9e201/manifest.m3u8", "drm": null }
    ]
  },
  {
    "name": "DISCOVERY TURBO",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=DT",
    "urls": [
      { "url": "https://viamotionhsi.netplus.ch/live/eds/tcm/browser-dash/tcm.mpd", "drm": "clearkey" },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001245/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "BUDDY STARS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BS",
    "urls": [
      { "url": "https://vthanh.utako.moe/homedrama/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://live-crave.video.9c9media.com/ab4332c60e19b6629129eeb38a2a6ac6db5df2571721750022187/fe/f/crave/crave2/manifest.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5015/default_ott.mpd", "drm": "widevine" },
      { "url": "https://cors.jugorder.de/https://tr.live.cdn.cgates.lt/live/dash/561002/index.mpd", "drm": "clearkey" },
      { "url": "https://fta2-cdn-flr.visionplus.id/out/v1/782400332c96440598260730a864bc6f/index.mpd", "drm": null },
      { "url": "https://qp-pldt-live-grp-10-prod.akamaized.net/out/u/cg_uaap_cplay_sd.mpd", "drm": null }
    ]
  },
  {
    "name": "TOKYO MX1",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TMX1",
    "urls": [
      { "url": "https://tglmp03.akamaized.net/out/v1/b0ddd3ed82164617a9640ec76f3628c2/manifest.mpd", "drm": null }
    ]
  },
  {
    "name": "BABY TV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BTV",
    "urls": [
      { "url": "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/kix_hd1.mpd", "drm": "clearkey" },
      { "url": "https://fta1-cdn-flr.visionplus.id/out/v1/dc63bd198bc44193b570e0567ff5b22c/index.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "NICK JR",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=NJR",
    "urls": [
      { "url": "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_taptv_sd.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "RPTV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=RPTV",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001159/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" },
      { "url": "https://ott.udptv.com/stream/udptv/go3sport/master.m3u8?u=discord.gg/civ4&p=b48a689eecee46d3167cbb669dddcd7f2e9f877b9ed7ee2bcc5bdfd0ca930ffd", "drm": null }
    ]
  },
  {
    "name": "HBO FAMILY",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HBF",
    "urls": [
      { "url": "https://1180885077.rsc.cdn77.org/HLS/BOXINGTV.m3u8", "drm": null },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001234/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "ASTRO BOO",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=AB",
    "urls": [
      { "url": "https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_hbohd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "TBS CHANNEL 1",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TBS1",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001174/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" },
      { "url": "https://ott.udptv.net/stream/iptv/hbozone/master.m3u8?u=discord.gg/civ4&p=b48a689eecee46d3167cbb669dddcd7f2e9f877b9ed7ee2bcc5bdfd0ca930ffd", "drm": null }
    ]
  },
  {
    "name": "ANIPLUS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=AP",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2510/default_ott.mpd", "drm": "widevine" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2506/default_ott.mpd", "drm": "widevine" },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/xfixnh8glr/out/v1/7bd3f3b9e3f94d15bc0a52878c067d60/cenc.mpd", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/cgnl_nba.mpd", "drm": null },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001092/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" },
      { "url": "https://fl1.moveonjoy.com/BOOMERANG/manifest.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "HBO 2",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HB2",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/1/out/u/dash/ESPNHD/default.mpd", "drm": "clearkey" },
      { "url": "https://vthanh.utako.moe/mondo/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "JSPORTS 1",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=JS1",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/500/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "NBA TV PHILIPPINES",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=NBA",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/wu0ibylhtz/out/v1/020953cc1b63428181fa569223470e1a/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "AT-X",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=ATX",
    "urls": [
      { "url": "https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/cg_ptv4_sd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "NIHON EIGA SENMON",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=NES",
    "urls": [
      { "url": "https://jungotvstream.chanall.tv/jungotv/frontrow/stream.m3u8", "drm": null },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/k0duzgfejg/out/v1/70a50b1bda944628b8e7e66ab4069419/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "MONDO TV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=MT",
    "urls": [
      { "url": "https://vthanh.utako.moe/bs12/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "UNIVERSAL CRIME",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=UC",
    "urls": [
      { "url": "https://qp-pldt-live-grp-08-prod.akamaized.net/out/u/travel_channel_sd.mpd", "drm": "clearkey" },
      { "url": "https://live-crave.video.9c9media.com/137c6e2e72e1bf67b82614c7c9b216d6f3a8c8281748505659713/fe/f/crave/crave1/manifest.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "TVB JADE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TVB",
    "urls": [
      { "url": "https://times-ott-live.akamaized.net/mnplus_wv_drm/index.mpd", "drm": "widevine" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5075/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "TV ASAHI CHANNEL 1",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TA1",
    "urls": [
      { "url": "https://vthanh.utako.moe/tbsch2/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-04-prod.akamaized.net/out/u/pbo_sd.mpd", "drm": "clearkey" },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/zuf794yutz/out/v1/ca3534bfe4f148298b36719204d108e0/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "BEIN SPORTS 5",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BS5",
    "urls": [
      { "url": "https://s2129134.cdn.mytvnet.vn/pkg20/live_dzones/dmax.smil/manifest.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/1006/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "ASTRO SPORTS PLUS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=ASP",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5096/default_ott.mpd", "drm": "widevine" },
      { "url": "https://vthanh.utako.moe/neco/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "LIVING ASIA CHANNEL",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=LAC",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/phxwb8s3u9/out/v1/45162b5b3c62402aa2e763b38517be9d/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "RAI ITALIA",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=RI",
    "urls": [
      { "url": "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/tvmaria_prd.mpd", "drm": "clearkey" },
      { "url": "https://ocnmovies2-drm2-mcdn.tving.com/ocnmovies2_drm/live5000.smil/manifest.mpd", "drm": "clearkey" },
      { "url": "https://cdn4.skygo.mn/live/disk1/CGTN_Doc/HLSv3-FTA/CGTN_Doc.m3u8", "drm": null }
    ]
  },
  {
    "name": "CGTN",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=CGTN",
    "urls": [
      { "url": "https://vthanh.utako.moe/fuji_two/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://fta1-cdn-flr.visionplus.id/out/v1/dd9cfc9ae76a4f8abbaa89708a915e38/index.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "CARTOON NETWORK",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=CN",
    "urls": [
      { "url": "https://atemeshield1-voe.sysln.id/live/eds/DragonTV/mpd/DragonTV.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "SETANTA SPORTS 2",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=SS2",
    "urls": [
      { "url": "https://vthanh.utako.moe/tbsch1/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://vthanh.utako.moe/ex_ch1/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://fl1.moveonjoy.com/E_ENTERTAINMENT_TELEVISION/manifest.mpd", "drm": null },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5017/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "EDGE SPORT",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=ES",
    "urls": [
      { "url": "https://fta3-cdn-flr.visionplus.id/out/v1/d2c68a3dfb644808b416bd90dcc92d5f/index.mpd", "drm": "clearkey" },
      { "url": "https://dice-live-ap.akamaized.net/hls/live/2001880/220941-300570/playlist.m3u8?hdnea=...", "drm": null }
    ]
  },
  {
    "name": "HBO SIGNATURE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HS",
    "urls": [
      { "url": "https://times-ott-live.akamaized.net/romedynow_wv_drm/index.mpd", "drm": "widevine" },
      { "url": "https://vthanh.utako.moe/spaceshower/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5052/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "AMC",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=AMC",
    "urls": [
      { "url": "https://ABBFTJ3AAAAAAAAMBPTDXCMDYGR3L.ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/6dmgizf5p5/out/v1/9a8dc2d85b6d4f9bb081d53cb26d2003/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "BS NITTELE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BSN",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5094/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "UNIVERSAL REALITY",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=UR",
    "urls": [
      { "url": "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_rockentertainment.mpd", "drm": null },
      { "url": "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_dreamworktag.mpd", "drm": "clearkey" },
      { "url": "https://live-atv-cdn.izzigo.tv/2/out/u/dash/UNIVERSALREALITYHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "HBO PLUS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HB+",
    "urls": [
      { "url": "https://cors.jugorder.de/https://tr.live.cdn.cgates.lt/live/dash/561201/index.mpd", "drm": "clearkey" },
      { "url": "https://atemeshield1-voe.sysln.id/live/eds/EUROSPORTHD/mpd/EUROSPORTHD.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "GREEN CHANNEL",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=GC",
    "urls": [
      { "url": "https://jungotvstream.chanall.tv/jungotv/jungopinoytv/stream.m3u8", "drm": null }
    ]
  },
  {
    "name": "FOX SPORTS PREMIUM",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=FSP",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/crenwml9jf/out/v1/09518f97387b4ea5a69279a1aa1daf0a/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "W-SPORTS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=WS",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5066/default_ott.mpd", "drm": "widevine" },
      { "url": "https://tglmp02.akamaized.net/out/v1/4148d890e367435480ca18465a014dd8/manifest.mpd", "drm": null }
    ]
  },
  {
    "name": "HOME DRAMA CHANNEL",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HDC",
    "urls": [
      { "url": "https://cors.jugorder.de/https://tr.live.cdn.cgates.lt/live/dash/561208/index.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "JSPORTS 2",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=JS2",
    "urls": [
      { "url": "https://vthanh.utako.moe/ex_ch2/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "PREMIERE 5",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=P5",
    "urls": [
      { "url": "https://uselector.cdn.intigral-ott.net/SPZ/SPZ.isml/manifest.mpd", "drm": "clearkey" },
      { "url": "https://live-atv-cdn.izzigo.tv/2/out/u/dash/UNIVERSALCRIMEHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "ADULT SWIM",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=AS",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/2/out/u/dash/NBAHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "MTV 00S",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=M00",
    "urls": [
      { "url": "https://atemeshield1-voe.sysln.id/live/eds/HunanTV/mpd/HunanTV.mpd", "drm": "clearkey" },
      { "url": "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/mrskysvotx/out/v1/ad58961bd8fd48d2944e461c034b8914/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "MBC ACTION",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=MBCA",
    "urls": [
      { "url": "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_tapsports.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "PREMIERE 4",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=P4",
    "urls": [
      { "url": "https://cnt1-slb.cdn.3bbtv.com:8443/3bb/live/302/302.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_historyhd.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/401/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "FOX SPORTS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=FS",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001112/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "PREMIER FOOTBALL",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=PF",
    "urls": [
      { "url": "https://amg19223-amg19223c1-amgplt0351.playout.now3.amagi.tv/playlist/amg19223-amg19223c1-amgplt0351/playlist.m3u8", "drm": null }
    ]
  },
  {
    "name": "PTV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=PTV",
    "urls": [
      { "url": "https://amg00405-rakutentv-cgtn-rakuten-i9tar.amagi.tv/master.m3u8", "drm": null }
    ]
  },
  {
    "name": "DISNEY CHANNEL",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=DC",
    "urls": [
      { "url": "https://giatv.bozztv.com/giatv/giatv-kpoptvplay/kpoptvplay/chunks.m3u8", "drm": null }
    ]
  },
  {
    "name": "NHK BS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=NHKB",
    "urls": [
      { "url": "https://uselector.cdn.intigral-ott.net/MBAH/MBAH.isml/manifest.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "STAR WORLD",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=SW",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/1003/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "KBS WORLD",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=KBS",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5009/default_ott.mpd", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_onesportsplus_hd1.mpd", "drm": "clearkey" },
      { "url": "https://vthanh.utako.moe/fuji_one/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "DISCOVERY ASIA",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=DA",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/fdx74zqzhu/out/v1/7d7a8c6981a842b98a683e9fbfe51d17/cenc.mpd", "drm": "widevine" },
      { "url": "https://live-crave.video.9c9media.com/c5875a31f178e038f7cc572b1aa0defb996ce7171748593186018/fe/f/crave/crave4/manifest.mpd", "drm": null },
      { "url": "https://live-atv-cdn.izzigo.tv/1/out/u/dash/NFLHD/default.mpd", "drm": "clearkey" },
      { "url": "https://otte.live.cf.ww.aiv-cdn.net/pdx-nitro/live/clients/dash/enc/mttgh1c4ei/out/v1/9cc664b146744e2ba23066aa048efbc5/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "PINOY XTREME",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=PX",
    "urls": [
      { "url": "https://cachehsi1a.netplus.ch/live/eds/orf1/browser-dash/orf1.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5093/default_ott.mpd", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-05-prod.akamaized.net/out/u/bilyonaryoch.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "FOX SPORTS 3",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=FS3",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/lsdasbvglv/out/v1/bb548a3626cd4708afbb94a58d71dce9/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "PREMIER SPORTS ASIA",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=PSA",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/4/out/u/dash/MTVHITSSD/default.mpd", "drm": null },
      { "url": "https://vthanh.utako.moe/Tokyo_MX2/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "DISCOVERY SCIENCE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=DS",
    "urls": [
      { "url": "https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/celmovie_pinoy_sd.mpd", "drm": null }
    ]
  },
  {
    "name": "NICK TOONS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=NT",
    "urls": [
      { "url": "https://dash2.antik.sk/stream/hisi_cinemax_2/playlist_cbcs.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5067/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "3ABN INTERNATIONAL",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=3ABN",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001338/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": null },
      { "url": "https://live-atv-cdn.izzigo.tv/4/out/u/dash/UNIVERSALCHANNELHD/default.mpd", "drm": null }
    ]
  },
  {
    "name": "KIX",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=KIX",
    "urls": [
      { "url": "https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_ps_hd1.mpd", "drm": "clearkey" },
      { "url": "https://fta2-cdn-flr.visionplus.id/out/v1/89a6e4261cd7470f83e5869e90440cff/index.mpd", "drm": "clearkey" },
      { "url": "https://d14c00opfjb50c.cloudfront.net/out/v1/0fa4eb67579d41cca4ed146c93aa855f/index.mpd", "drm": "clearkey" },
      { "url": "https://a-cdn.klowdtv.com/live2/france24_720p/chunks.m3u8", "drm": null },
      { "url": "https://live-atv-cdn.izzigo.tv/2/out/u/dash/COMEDYCENTRALHD/default.mpd", "drm": null }
    ]
  },
  {
    "name": "SPORTSTARS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=SS",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2511/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "EUROSPORT 2",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=E2",
    "urls": [
      { "url": "https://uselector.cdn.intigral-ott.net/STM/STM.isml/manifest.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "DMAX",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=DMAX",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/1/out/u/dash/ESPN2HD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "CTI",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=CTI",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/9983/default_ott.mpd", "drm": "widevine" },
      { "url": "https://lotus.stingray.com/manifest/cmusic-cme004-montreal/samsungtvplus/master.m3u8", "drm": null }
    ]
  },
  {
    "name": "BEIN SPORTS 3",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BS3",
    "urls": [
      { "url": "https://2-fss-2.streamhoster.com/pl_140/amlst:200914-1298290/chunklist_b2000000.m3u8", "drm": null }
    ]
  },
  {
    "name": "IBC 13",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=IBC",
    "urls": [
      { "url": "https://ott.udptv.net/stream/iptv/aniplus/master.m3u8?u=discord.gg/civ4&p=b48a689eecee46d3167cbb669dddcd7f2e9f877b9ed7ee2bcc5bdfd0ca930ffd", "drm": null }
    ]
  },
  {
    "name": "SPORTSTARS 2",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=SS2",
    "urls": [
      { "url": "https://amg19223-amg19223c5-amgplt0351.playout.now3.amagi.tv/playlist/amg19223-amg19223c5-amgplt0351/playlist.m3u8", "drm": null }
    ]
  },
  {
    "name": "MOTORVISION+",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=MV",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001177/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "ESPN",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=ESPN",
    "urls": [
      { "url": "https://fta2-cdn-flr.visionplus.id/out/v1/2e55bc8199044c27b1dbb827af65a04f/index.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_bbcearth_hd1.mpd", "drm": "clearkey" },
      { "url": "https://tv-trtworld.medya.trt.com.tr/master.m3u8", "drm": null }
    ]
  },
  {
    "name": "VIVA CINEMA",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=VC",
    "urls": [
      { "url": "https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_bbclifestyle.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "THRILL",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=T",
    "urls": [
      { "url": "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_spotv2hd.mpd", "drm": "clearkey" },
      { "url": "https://cnt1-streamer14.cdn.3bbtv.com:8443/3bb/live/101/101.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "BEIN SPORTS 2",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BS2",
    "urls": [
      { "url": "https://fta2-cdn-flr.visionplus.id/out/v1/73b7057c72da4615888a11b02a6cbb3c/index.mpd", "drm": "clearkey" },
      { "url": "https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/trace-uk/6655b878-f320-467c-b91d-153baf27a101/1.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_knowledgechannel.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "TAP EDGE",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TE",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5110/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "ONE SPORTS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=OS",
    "urls": [
      { "url": "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_onesports_hd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "INC TV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=INC",
    "urls": [
      { "url": "https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/cg_pbarush_hd1.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-04-prod.akamaized.net/out/u/onenews_hd1.mpd", "drm": "clearkey" },
      { "url": "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8", "drm": null },
      { "url": "https://nhkwlive-ojp.akamaized.net/hls/live/2003459/nhkwlive-ojp-en/index.m3u8", "drm": null }
    ]
  },
  {
    "name": "CLTV 36",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=C36",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/fra-nitro/live/clients/dash/enc/vcog5dpiby/out/v1/62521b63232844669628ad2c35776bd1/cenc.mpd", "drm": "widevine" },
      { "url": "https://viamotionhsi.netplus.ch/live/eds/vox/browser-dash/vox.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "HBO Pack",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HBP",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001123/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" },
      { "url": "https://live-atv-cdn.izzigo.tv/1/out/u/dash/ESPN3HD/default.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2702/default_ott.mpd", "drm": "widevine" },
      { "url": "https://jmp2.uk/sam-USAJ3000013FJ.m3u8", "drm": null }
    ]
  },
  {
    "name": "HBO",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HBO",
    "urls": [
      { "url": "https://qp-pldt-live-grp-08-prod.akamaized.net/out/u/truefm_tv.mpd", "drm": "clearkey" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5054/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "JEEPNEY TV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=JTV",
    "urls": [
      { "url": "https://fta3-cdn-flr.visionplus.id/out/v1/e992e986a88346c18a5dcc4fbcdae6b9/index.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "ONE NEWS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=ON",
    "urls": [
      { "url": "https://amdlive-ch01-ctnd-com.akamaized.net/arirang_1ch/smil:arirang_1ch.smil/playlist.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/dr_cnnhd.mpd", "drm": "clearkey" },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/wybgz0orr8/out/v1/2f6d1612abd44f5883917f8a585b955f/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "OCN MOVIES 2",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=OM2",
    "urls": [
      { "url": "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_thrill_sd.mpd", "drm": "clearkey" },
      { "url": "https://vthanh.utako.moe/bsntv/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://vthanh.utako.moe/bsfuji/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "HBO ZONE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HZ",
    "urls": [
      { "url": "https://live-atv-cdn.izzigo.tv/2/out/u/dash/PARAMOUNTHD/default.mpd", "drm": "clearkey" },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001143/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": null },
      { "url": "https://vthanh.utako.moe/sport_live_plus/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://uselector.cdn.intigral-ott.net/FMA/FMA.isml/manifest.mpd", "drm": "clearkey" },
      { "url": "https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00718-outdoorchannela-outdoortvnz-samsungnz/playlist.m3u8", "drm": null }
    ]
  },
  {
    "name": "SKY SPORTS",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=SS",
    "urls": [
      { "url": "https://viamotionhsi.netplus.ch/live/eds/rtl/browser-dash/rtl.mpd", "drm": "clearkey" },
      { "url": "https://vthanh.utako.moe/js2/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "ZOOMOO",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=ZM",
    "urls": [
      { "url": "https://viamotionhsi.netplus.ch/live/eds/3sathd/browser-dash/3sathd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "BOXING TV",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BTV",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd", "drm": "widevine" },
      { "url": "https://vthanh.utako.moe/fuji_next/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_spotvhd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "News",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=N",
    "urls": [
      { "url": "https://www.bloomberg.com/media-manifest/streams/asia.m3u8", "drm": null },
      { "url": "https://live-atv-cdn.izzigo.tv/4/out/u/dash/MTVLIVEHD/default.mpd", "drm": "clearkey" },
      { "url": "https://tglmp01.akamaized.net/out/v1/de55fad9216e4fe7ad8d2eed456ba1ec/manifest.mpd", "drm": "clearkey" },
      { "url": "https://live-atv-cdn.izzigo.tv/2/out/u/dash/UNIVERSALPREMIEREHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "13TH STREET",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=13S",
    "urls": [
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/m6wutxqcro/out/v1/24b63f99ba674656b9990ef85c87d6ce/cenc.mpd", "drm": "widevine" },
      { "url": "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_rockextreme.mpd", "drm": "clearkey" },
      { "url": "https://viamotionhsi.netplus.ch/live/eds/mtvfrance/browser-dash/mtvfrance.mpd", "drm": "clearkey" },
      { "url": "https://live-atv-cdn.izzigo.tv/3/out/u/dash/MTV00HD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "TRUE FM TV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TF",
    "urls": [
      { "url": "https://vthanh.utako.moe/js4/tracks-v1a1/mono.m3u8", "drm": null }
    ]
  },
  {
    "name": "BILLIARDS TV",
    "group": "Sports",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BT",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001254/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" },
      { "url": "https://uselector.cdn.intigral-ott.net/DCF/DCF.isml/manifest.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_foodnetwork_hd1.mpd", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_tv5_monde.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "HITS MOVIES",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=HM",
    "urls": [
      { "url": "https://vthanh.utako.moe/wlive/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_hbofam.mpd872910c843294319800d85f9a0940607", "drm": "clearkey" },
      { "url": "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_tagalogmovie.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "TV ASAHI CHANNEL 2",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TA2",
    "urls": [
      { "url": "https://amg02188-amg02188c2-jungotv-northamerica-5717.playouts.now.amagi.tv/playlist1080p.m3u8", "drm": null },
      { "url": "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_tapactionflix_hd1.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "UNIVERSAL PREMIERE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=UP",
    "urls": [
      { "url": "https://vthanh.utako.moe/AT-X/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://tracetv-sportstarts-vidaa.amagi.tv/playlist.m3u8", "drm": null }
    ]
  },
  {
    "name": "TV5MONDE STYLE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=T5MS",
    "urls": [
      { "url": "https://cors.jugorder.de/https://tr.live.cdn.cgates.lt/live/dash/560908/index.mpd", "drm": "clearkey" },
      { "url": "https://jungotvstream.chanall.tv/jungotv/screamflix/stream.m3u8", "drm": null },
      { "url": "https://cors.jugorder.de/https://linear210-de-dash1-prd-cf.cdn12.skycdp.com/bced/033341/index.mpd?c3.ri=13629687177772365970", "drm": "clearkey" },
      { "url": "https://ocnmovies-drm2-mcdn.tving.com/ocnmovies_drm/live5000.smil/manifest.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "TOKYO MX2",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TMX2",
    "urls": [
      { "url": "https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_tvnmovie.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "ZEE SINE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=ZS",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001406/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" },
      { "url": "https://abbftj3aaaaaaaame5ktsp32q2ykl.ottb.live.cf.ww.aiv-cdn.net/dub-nitro/live/clients/dash/enc/cmtyd9kpfe/out/v1/813bba04214e4f4dab57f0129365635a/cenc.mpd", "drm": "widevine" },
      { "url": "https://lotus.stingray.com/manifest/djazz-djaads-montreal/samsungtvplus/master.m3u8", "drm": null },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/5060/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "REDBULL TV",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=RB",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001248/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "Factual & Lifestyle",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=F&L",
    "urls": [
      { "url": "https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_premiertennishd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "CRAVE 2",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=C2",
    "urls": [
      { "url": "https://amg19223-amg19223c12-amgplt0352.playout.now3.amagi.tv/playlist/amg19223-amg19223c12-amgplt0352/playlist.m3u8", "drm": null }
    ]
  },
  {
    "name": "ANIME X HIDIVE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=AXH",
    "urls": [
      { "url": "https://qp-pldt-live-grp-04-prod.akamaized.net/out/u/oneph_sd.mpd", "drm": "clearkey" },
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001250/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "RT DOCUMENTARY",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=RTD",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2705/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "LIFETIME",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=L",
    "urls": [
      { "url": "https://fta3-cdn-flr.visionplus.id/out/v1/bde0a6d8d3fd4d77ae5093ad2e6699dc/index.mpd", "drm": "clearkey" },
      { "url": "https://cors.jugorder.de/https://tr.live.cdn.cgates.lt/live/dash/561306/index.mpd", "drm": "clearkey" },
      { "url": "https://live-atv-cdn.izzigo.tv/5/out/u/dash/HBOXTREMEHD/default.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "LOVE NATURE",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=LN",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2406/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "ASIAN FOOD NETWORK",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=AFN",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2305/default_ott.mpd", "drm": "widevine" },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/100/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "SKY A",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=SA",
    "urls": [
      { "url": "https://dash2.antik.sk/stream/hisi_jimjam/playlist_cbcs.mpd", "drm": null }
    ]
  },
  {
    "name": "TVB ENTERTAINMENT NEWS",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TVB",
    "urls": [
      { "url": "https://dash2.antik.sk/stream/hisi_h2/playlist_cbcs.mpd", "drm": "clearkey" },
      { "url": "https://vthanh.utako.moe/Tokyo_MX1/tracks-v1a1/mono.m3u8", "drm": null },
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/2306/default_ott.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "NOW 80S",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=N80",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001183/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  },
  {
    "name": "TBS CHANNEL 2",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=TBS2",
    "urls": [
      { "url": "https://viamotionhsi.netplus.ch/live/eds/daserstehd/browser-dash/daserstehd.mpd", "drm": "clearkey" },
      { "url": "https://live-crave.video.9c9media.com/58def7d65f59ffaf995238981dd0e276d5a8fe8d1748593014588/fe/f/crave/crave3/manifest.mpd", "drm": null }
    ]
  },
  {
    "name": "NEW KPOP",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=NK",
    "urls": [
      { "url": "https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_buko_sd.mpd", "drm": "clearkey" }
    ]
  },
  {
    "name": "BS TV TOKYO",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=BSTT",
    "urls": [
      { "url": "https://amg17931-zee-amg17931c9-samsung-ph-6528.playouts.now.amagi.tv/playlist/amg17931-asiatvusaltdfast-zeesine-samsungph/playlist.m3u8", "drm": null }
    ]
  },
  {
    "name": "FIGHTING TV SAMURAI",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=FTS",
    "urls": [
      { "url": "https://linearjitp-playback.astro.com.my/dash-wv/linear/400/default_ott.mpd", "drm": "widevine" },
      { "url": "https://ottb.live.cf.ww.aiv-cdn.net/gru-nitro/live/clients/dash/enc/s818vishap/out/v1/7a63dfa162b443ceb195075092adbb21/cenc.mpd", "drm": "widevine" }
    ]
  },
  {
    "name": "BILYONARYO",
    "group": "International",
    "logo": "https://placehold.co/40x40/5a67d8/ffffff?text=B",
    "urls": [
      { "url": "https://bunproxy.azurewebsites.net/api/001/2/ch00000090990000001090/manifest.mpd?virtualDomain=001.live_hls.zte.com", "drm": "clearkey" }
    ]
  }
];

// Main App component
const App = () => {
  const [source, setSource] = useState('');
  const [playersReady, setPlayersReady] = useState(false);
  const videoRef = useRef(null);
  const hlsPlayerRef = useRef(null);
  const dashPlayerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamically load player libraries
  useEffect(() => {
    let hlsScript = document.createElement('script');
    hlsScript.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    hlsScript.async = true;
    
    let dashScript = document.createElement('script');
    dashScript.src = 'https://cdn.dashjs.org/latest/dash.all.min.js';
    dashScript.async = true;

    let hlsLoaded = false;
    let dashLoaded = false;

    const onScriptLoad = () => {
      // Check if both libraries are loaded and set the state
      if (window.Hls) { hlsLoaded = true; }
      if (window.dashjs) { dashLoaded = true; }
      if (hlsLoaded && dashLoaded) {
        setPlayersReady(true);
      }
    };

    hlsScript.onload = onScriptLoad;
    dashScript.onload = onScriptLoad;

    document.body.appendChild(hlsScript);
    document.body.appendChild(dashScript);

    return () => {
      document.body.removeChild(hlsScript);
      document.body.removeChild(dashScript);
    };
  }, []);

  // Handle video playback logic once libraries are ready
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video || !playersReady) {
      return;
    }
    
    // Cleanup existing players
    if (hlsPlayerRef.current) {
      hlsPlayerRef.current.destroy();
      hlsPlayerRef.current = null;
    }
    if (dashPlayerRef.current) {
      dashPlayerRef.current.reset();
      dashPlayerRef.current = null;
    }

    if (source) {
      if (source.includes('.m3u8')) {
        if (window.Hls.isSupported()) {
          const hls = new window.Hls();
          hlsPlayerRef.current = hls;
          hls.loadSource(source);
          hls.attachMedia(video);
          hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(error => console.error('Autoplay prevented:', error));
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source;
          video.addEventListener('loadedmetadata', () => video.play());
        }
      } else if (source.includes('.mpd')) {
        const dashPlayer = window.dashjs.MediaPlayer().create();
        dashPlayerRef.current = dashPlayer;
        dashPlayer.initialize(video, source, true);
      }
    }
    
    return () => {
      if (hlsPlayerRef.current) {
        hlsPlayerRef.current.destroy();
      }
      if (dashPlayerRef.current) {
        dashPlayerRef.current.reset();
      }
    };
    
  }, [source, playersReady]);

  const handleChannelClick = (url) => {
    setSource(url);
  };
  
  const [openChannel, setOpenChannel] = useState(null);

  const toggleChannelUrls = (channelName) => {
    setOpenChannel(openChannel === channelName ? null : channelName);
  };

  const filteredChannels = channelList.filter(channel => 
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row p-4 font-sans gap-4">
      
      {/* Channel List Section */}
      <div className="md:w-1/4 w-full p-4 bg-gray-800 rounded-xl shadow-2xl flex-shrink-0 md:max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4 sticky top-0 bg-gray-800 pb-2">
          Channels
        </h2>
        {filteredChannels.length > 0 ? (
          filteredChannels.map((channel, index) => (
            <div key={index} className="mb-2">
              <div
                onClick={() => toggleChannelUrls(channel.name)}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors
                  ${openChannel === channel.name ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <img 
                  src={channel.logo} 
                  alt={`${channel.name} logo`} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => { e.target.src = "https://placehold.co/40x40/5a67d8/ffffff?text=TV"; }}
                />
                <span className="font-medium truncate flex-grow">
                  {channel.name}
                </span>
                {channel.urls.length > 1 && (
                  <span className="text-sm font-semibold text-indigo-200">
                    {openChannel === channel.name ? '▲' : '▼'}
                  </span>
                )}
              </div>
              {openChannel === channel.name && (
                <div className="mt-2 ml-4 border-l-2 border-gray-600 pl-4">
                  {channel.urls.map((urlData, urlIndex) => (
                    <div
                      key={urlIndex}
                      onClick={() => handleChannelClick(urlData.url)}
                      className={`p-2 rounded-lg cursor-pointer transition-colors text-sm
                        ${source === urlData.url ? 'bg-indigo-500 text-white' : 'hover:bg-gray-700'}`}
                    >
                      {urlData.drm ? (
                        <span className="text-xs text-red-300 mr-2">[DRM]</span>
                      ) : (
                        <span className="text-xs text-green-300 mr-2">[FREE]</span>
                      )}
                      <span className="truncate">{urlData.url.split('/').pop()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-4">Walang nakitang channel.</p>
        )}
      </div>

      {/* Video Player Section */}
      <div className="flex-grow flex flex-col justify-center items-center p-6 bg-gray-800 rounded-xl shadow-2xl">
        {source ? (
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              autoPlay
            ></video>
          </div>
        ) : (
          <div className="w-full aspect-video flex items-center justify-center bg-gray-900 rounded-lg shadow-xl">
            <p className="text-xl text-gray-400 text-center">Pumili ng channel sa kaliwa para magsimula.</p>
          </div>
        )}
      </div>

      {/* Script tags for HLS.js and Dash.js to fix reference errors */}
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default App;
