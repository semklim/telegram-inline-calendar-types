// Type definitions for telegram-inline-calendar
// Project: https://github.com/VDS13/telegram-inline-calendar
// Definitions by: semklim <https://github.com/semklim>
// Definitions: https://github.com/semklim/telegram-inline-calendar-types

interface Message {
  [k: string]: unknown;
}

interface CallbackQuery {
  [k: string]: unknown;
}

interface InlineKeyboardButton {
  text: string;
  callback_data: string;
}

interface InlineKeyboardMarkup {
  resize_keyboard: boolean;
  inline_keyboard: InlineKeyboardButton[][];
}

type Context<U = any> = Record<any, any>;
type Update = any;
type Telegraf<C> = Record<any, any>;
type Bot<C, A> = Record<any, any>;
type Api<R> = Record<any, any>;
type RawApi = Record<any, any>;
type TelegramBot = Record<any, any>;
type TeleBot = Record<any, any>;

declare module "telegram-inline-calendar" {
  interface CalendarOptions {
    /**
     * Get the formatted date according to the string of tokens passed in.
     *```ts
     * date_format = 'YYYY-MM-DD' //default
     * ```
     * Docs: https://day.js.org/docs/en/display/format
     */
    date_format?: string;
    /**
     * Available languages
     * ```ts
     * language = "en" //default
     * ```
     */
    language?: "en" | "es" | "de" | "es" | "fr" | "it" | "tr" | "id" | "uk";
    /**
     * Telegram bot library
     * ```ts
     * bot_api = 'node-telegram-bot-api' //default
     * ```
     */
    bot_api?: "node-telegram-bot-api" | "telegraf" | "telebot" | "grammy";
    /**
     * Close calendar after date selection
     *```
     * close_calendar = true //default
     *```
     */
    close_calendar?: boolean;
    /**
     * First day of the week(Sunday - `0`, Monday - `1`, Tuesday - `2` and so on)
     * ```
     * start_week_day = 0 //default
     * ```
     */
    start_week_day?: number;
    /**
     * Enable time selection after a date is selected.
     * ```
     * time_selector_mod = false //default
     * ```
     */
    time_selector_mod?: boolean;
    /**
     * Allowed time range in "HH:mm-HH:mm" format
     * ```
     * time_range = "00:00-23:59" //default
     * ```
     */
    time_range?: string;
    /**
     * Time step in the format "<Time step><m | h>"
     * ```
     * time_step = "30m" //default
     * ```
     */
    time_step?: string;
    /**
     * Minimum date of the calendar in the format "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" or "now"
     * ```
     * start_date = false //default
     * ```
     */
    start_date?: Date | false | "now";
    /**
     * Maximum date of the calendar in the format "YYYY-MM-DD" or "YYYY-MM-DD HH:mm" or "now"
     * ```
     * stop_date = false //default
     * ```
     */
    stop_date?: Date | false | "now";
    /**
     * Text of the message sent with the calendar/time selector
     * ```
     * custom_start_msg = false //default
     * ```
     */
    custom_start_msg?: string | false;
    /**
     * Enable blocked dates list
     * ```
     * lock_date = false //default
     * ```
     */
    lock_date?: boolean;
    /**
     * Enable list of blocked dates and times
     * ```
     * lock_datetime = false //default
     * ```
     */
    lock_datetime?: boolean;
    /**
     * Аrray of blocked dates in string format in the format "YYYY-MM-DD".
     * ```
     * lock_date_array = false //default
     * ```
     */
    lock_date_array?: string[] | false;
    /**
     * Аrray of blocked dates and times in string format in the format "YYYY-MM-DD HH:mm".
     * ```
     * lock_datetime_array = false //default
     * ```
     */
    lock_datetime_array?: string[] | false;
  }

  class Calendar {
    private lock_date_array: string[];
    private DateFunc: {
      withoutLockDate(date: Date, d: number): boolean;
      withLockDate(date: Date, d: number): boolean;
    };
    private DatetimeFunc: {
      withoutLockDatetime(date: Date, datetime: string, type: string): boolean;
      withLockDatetime(date: Date, datetime: string, type: string): boolean;
    };
    private checkDate: (date: Date, d: number) => boolean;
    private checkDatetime: (
      date: Date,
      datetime: string,
      type: string,
    ) => boolean;
    private lang: {
      select: Record<string, string>;
      selectdatetime: Record<string, string>;
      selecttime: Record<string, string>;
      back: Record<string, string>;
      month3: Record<string, string[]>;
      week: Record<string, string[]>;
    };
    private NodeTelegramBotApi: any;
    private Telegraf: any;
    private Telebot: any;
    private Grammy: any;
    public chats: Map<number, number>;
    public options: CalendarOptions;
    /**
     * Date, time picker and inline calendar.
     * 
     * @param bot TelegramBot class instance (Telebot/node-telegram-bot-api) or `false` for (Telegraf/grammY)
     * 
     * @param options Configuration object
     * 
     * @link API: https://github.com/VDS13/telegram-inline-calendar/blob/main/v2.x/API.md
     *
     */
    constructor(
      bot: Telegraf<Context<Update>>
        | Bot<Context, Api<RawApi>>
        | TelegramBot
        | TeleBot
        | false,
      options: CalendarOptions,
    );

    private libraryInitialization(): void;
    private dateFuncInitialization(): void;
    private datetimeFuncInitialization(): void;
    private weekDaysButtons(day: number): number;
    private startWeekDay(day: number): number;
    private twoDigits(num: number): string;
    private colRowNavigation(date: Date, cd: number): number;
    private howMuchDays(year: number, month: number): number;
    private addCustomStartMsg(): void;

    createTimeSelector(
      date?: Date,
      from_calendar?: boolean,
    ): InlineKeyboardMarkup;

    createNavigationKeyboard(date: Date): InlineKeyboardMarkup;

    /**
     * Generating and sending a calendar to the user. Sets the current month and year.
     * @param msg This is Context in grammyjs and telegraf, message in Telebot/node-telegram-bot-api
     * @links
     * https://core.telegram.org/bots/api#message (Telebot/node-telegram-bot-api)
     * https://deno.land/x/grammy@v1.15.1/mod.ts?s=Context (grammY)
     * https://telegraf.js.org/classes/Context.html (Telegraf)
     */
    startNavCalendar(
      msg: Message
        | Context
    ): void;

    /**
     * Generating and sending a time selector to the user.
     * @param msg This is Context in grammyjs and telegraf, message in Telebot/node-telegram-bot-api
     * @links
     * https://core.telegram.org/bots/api#message (Telebot/node-telegram-bot-api)
     * https://deno.land/x/grammy@v1.15.1/mod.ts?s=Context (grammY)
     * https://telegraf.js.org/classes/Context.html (Telegraf)
     */
    startTimeSelector(
      msg: Message
        | Context
    ): void;

    /**
     * Handle clicking on the calendar or the time selector.
     * @param msg This is Context in grammyjs and telegraf, callbackquery in Telebot/node-telegram-bot-api
     * @returns `String | Number` - If a date is selected, it will return a string in the specified format, otherwise it will return -1.
     *
     * @links
     * https://core.telegram.org/bots/api#callbackquery (Telebot/node-telegram-bot-api)
     * https://deno.land/x/grammy@v1.15.1/mod.ts?s=Context (grammY)
     * https://telegraf.js.org/classes/Context.html (Telegraf)
     */
    clickButtonCalendar(
      msg:
        | CallbackQuery
        | Context,
    ): string | number;

    /**
     * Calendar generation.
     * @param date Year and month for which you want to get a calendar.
     * @returns InlineKeyboardMarkup (https://core.telegram.org/bots/api#inlinekeyboardmarkup)
     */
    createNavigationKeyboard(date: Date): InlineKeyboardMarkup;

    /**
     * Time selector generation.
     * @param date Date Objects for which you want to get a time selector.
     * @param from_calendar Calling the time selector from the calendar.
     * @returns InlineKeyboardMarkup (https://core.telegram.org/bots/api#inlinekeyboardmarkup)
     */
    createTimeSelector(
      date?: Date,
      from_calendar?: boolean,
    ): InlineKeyboardMarkup;

    /**
     * Change current calendar language.
     *
     * @param lang Code of language
     */
    changeLang(lang: CalendarOptions["language"]): void;
  }
}
