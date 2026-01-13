# Online Account Biopsy

Big Tech companies [don't need to listen through your microphone to serve you creepy ads](https://www.eff.org/deeplinks/2018/04/facebook-doesnt-need-listen-through-your-microphone-serve-you-creepy-ads). Some ads make it seem like they are listening, but in reality, these companies are _simulating_ the kinds of conversations, purchases, and other behaviors you will carry out in the real world. These simulations are based on a digital profile made up of extensive online trace data -- digital "scraps" like locations, clicks, watch history, and more -- which are combined to create a [doll-like](https://futurism.com/the-byte/google-company-voodoo-doll-avatar) model of you.

Thanks to the General Data Protection Regulation (GDPR), and especially [Article 15](https://gdpr-info.eu/art-15-gdpr/), companies now provide various ways to access this trace data they hold about us. This is often an option buried in the privacy settings menu somewhere and titled "export my data," "data export request," "download my profile," or something like that.

*The purpose of this exercise is to retrieve and meditate on these data, guided by the metaphor of a "digital rag doll."*


## Part 1: Collect Personal Trace Data

First, retrieve some of the data these companies have about you. You can choose one of the options below, or another app you use that offers this feature.

**Note**: many companies take a few days to actually send you the data, so try to request the data a few days before you plan to make the doll.

| # | Platform | Download Your Data Guide |
| :-- | :-- | :-- |
| 1 | Google | [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) |
| 2 | TikTok | [TikTok Help: Requesting Your Data](https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data) |
| 3 | Instagram | [Instagram Data Download](https://www.multcloud.com/explore/what-is-included-in-instagram-data-download-0121-ac.html) |
| 4 | YouTube | [Your Data in YouTube](https://support.google.com/youtube/answer/9315727?hl=en) |
| 5 | Facebook | [Facebook Data Download](https://www.pandasecurity.com/en/mediacenter/how-to-download-your-personal-data-from-facebook-a-step-by-step-guide/) |
| 6 | Apple | [Get a Copy of Your Apple Account Data](https://www.macrumors.com/how-to/get-a-copy-of-your-apple-account-data/) |
| 7 | Snapchat | [Snapchat: How to Download My Data](https://help.snapchat.com/hc/en-us/articles/7012305371156-How-do-I-download-my-data-from-Snapchat) |
| 8 | Reddit | [Reddit Data Request](https://support.reddithelp.com/hc/en-us/articles/360043048352-How-do-I-request-a-copy-of-my-Reddit-data-and-information) |
| 9 | Twitter (X) | [Twitter Data Download](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive) |
| 10 | LinkedIn | [LinkedIn Data Download](https://www.linkedin.com/help/linkedin/answer/a1343196/downloading-your-account-data?lang=en) |


## Part 2: Review Trace Data

Spend some time reviewing the data. It should be fairly straightforward to bring it into a structured data analysis library (i.e. Pandas) if you were given a [CSV](https://pandas.pydata.org/docs/dev/reference/api/pandas.read_csv.html#) or [JSON](https://pandas.pydata.org/docs/dev/reference/api/pandas.read_json.html). This can be useful for getting some interesting lifetime stats, such as:
* How many total TikToks have I watched?
* How many total posts have I liked on Instagram?
* Which accounts have I engaged with the most?
* How many comments have I posted?
* How many hours of YouTube videos have I watched?

In addition to these quantitative questions, consider the substance represented in the data. Guiding questions might be:
* If someone only had this data about a person, what would they infer about that person?
* Which advertisers might try to reach a person with this kind of data?
* Which data represent me accurately? Inaccurately? Unsure?
* Does this data capture specific time periods with more or less accuracy?
* How much of this data would I feel comfortable sharing more broadly?

