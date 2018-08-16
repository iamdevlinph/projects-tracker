const getBadgeColor = (data, settings, type) => {
  let color;
  if (type === 'issues') {
    switch (true) {
      case (data >= settings.issueDangerCount):
        color = settings.issueDanger;
        break;
      case (data >= settings.issueWarningCount):
        color = settings.issueWarning;
        break;
      default:
        color = settings.issueSafe;
    }
  }

  if (type === 'pulls') {
    switch (true) {
      case (data >= settings.prDangerCount):
        color = settings.prDanger;
        break;
      case (data >= settings.prWarningCount):
        color = settings.prWarning;
        break;
      default:
        color = settings.prSafe;
    }
  }
  return color;
};

const BadgeUtil = {
  getBadgeColor,
};

export default BadgeUtil;
