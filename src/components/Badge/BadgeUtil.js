const getBadgeColor = (data, settings) => {
  let color;
  switch (true) {
    case (data >= settings.dangerCount):
      color = settings.dangerColor;
      break;
    case (data >= settings.warningCount):
      color = settings.warningColor;
      break;
    default:
      color = settings.safeColor;
  }
  return color;
};

const BadgeUtil = {
  getBadgeColor,
};

export default BadgeUtil;
