module.exports = {
  /**
   * @param {Date | undefined} date
   * @returns UTC date
   */
  getUtcDate: (date) => {
    const newDate = date ?? new Date();
    return new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
  }
};

export {};
