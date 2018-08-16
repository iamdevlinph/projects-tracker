const getBadgeColor = (data, settings, type) => {
  let color;
  if (type === 'issues') {
    switch (true) {
      case (data >= settings.issueDangerCount):
        color = settings.issueDanger;
        break;
      case (data >= settings.issueModerateCount):
        color = settings.issueModerate;
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
      case (data >= settings.prModerateCount):
        color = settings.prModerate;
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
