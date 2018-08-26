const getBadgeColor = (data, settings) => {
  let color;
  switch (true) {
    case (data >= settings.dangerCount):
      color = settings.dangerColor;
      break;
    case (data >= settings.warningCount):
      color = settings.warningColor;
      break;
    case (data > 0):
      color = settings.safeColor;
      break;
    default:
      color = '#555555';
  }
  return color;
};

const BadgeUtil = {
  getBadgeColor,
};

export default BadgeUtil;
