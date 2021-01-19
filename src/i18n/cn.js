export default {
  buttons: {
    // All button text is uppercased in the gui
    advanced: "先进",
    all: "所有",
    back: "返回",
    browse: "浏览",
    cancel: "取消",
    change: "改变",
    check: "检查",
    clear: "清楚",
    close: "关闭",
    contacts: "接触",
    copyAddress: "复制地址",
    copyData: "复制数据",
    copySignature: "复制签名",
    createWallet: "创建钱包",
    decrypt: "解密",
    delete: "删除",
    edit: "编辑",
    export: "出口",
    generate: "生成",
    import: "进口",
    importWallet: "进口钱包 | 进口钱包",
    lns: "GYUANX 名称服务",
    max: "麦克斯",
    min: "最小",
    next: "下一个",
    openWallet: "打开钱包",
    purchase: "购买",
    receive: "收到",
    registerServiceNode: "注册服务节点",
    renew: "更新",
    rescan: "重新扫描",
    restoreWallet: "恢复钱包",
    save: "救",
    saveTxNotes: "保存 TX 注释",
    selectLocation: "选择位置",
    selectWalletFile: "选择钱包文件",
    send: "发送",
    sendCoins: "发送硬币",
    serviceNode: "服务节点",
    settings: "设置",
    showQRCode: "显示二维码",
    showTxDetails: "显示 TX 详细信息",
    sign: "标志",
    stake: "股份",
    sweepAll: "扫荡所有",
    unlock: "解 锁",
    update: "更新",
    verify: "验证",
    viewOnExplorer: "在资源管理器上查看"
  },
  dialog: {
    // Generic buttons
    buttons: {
      ok: "还行",
      cancel: "取消",
      open: "打开"
    },

    // Dialogs
    banPeer: {
      title: "禁止 连接",
      peerDetailsTitle: "对等体详细信息",
      message: "输入长度以秒为单位禁止对等体.\n默认 3600 = 1 小时。",
      ok: "禁止 连接"
    },
    copyAddress: {
      title: "复制地址",
      message:
        "有与此地址关联的付款 ID.\n请务必单独复制付款 ID."
    },
    copyPrivateKeys: {
      // Copy {seedWords/viewKey/spendKey}
      title: "复制 {type}",
      message:
        "小心你把你的私钥寄给谁，因为他们控制你的资金。",
      seedWords: "种子词",
      viewKey: "查看键",
      spendKey: "花费密钥"
    },
    deleteWallet: {
      title: "删除钱包",
      message:
        "你绝对确定要删除你的钱包吗？\n请确保您的私钥已备份。\n这个过程是不可逆的！",
      ok: "删除"
    },
    exit: {
      title: "退出",
      message: "是否确实要退出？",
      ok: "退出"
    },
    keyImages: {
      title: "{type} 关键图像",
      message: "是否要 {type} 关键图像？",
      export: "出口",
      import: "进口"
    },
    lnsUpdate: {
      title: "更新 LNS 记录",
      message: "是否要更新 LNS 记录？",
      ok: "更新"
    },
    noPassword: {
      title: "无密码集",
      message: "是否确实要创建没有密码的钱包？",
      ok: "是的"
    },
    password: {
      title: "密码",
      message: "输入钱包密码以继续。"
    },
    purchase: {
      title: "购买名称",
      message: "是否要购买该名称？",
      ok: "购买"
    },
    renew: {
      title: "续订名称",
      message: "是否要续订名称？",
      ok: "更新"
    },
    registerServiceNode: {
      title: "注册服务节点",
      message: "是否要注册服务节点？",
      ok: "注册"
    },
    rescan: {
      title: "重新扫描钱包",
      message:
        "警告：有关以前事务的一些信息\n例如收件人的地址将丢失。",
      ok: "重新扫描"
    },
    restart: {
      title: "重新 启动",
      message: "更改需要重新启动。现在要重新启动吗？",
      ok: "重新 启动"
    },
    showPrivateKeys: {
      title: "显示私钥",
      message: "是否要查看私钥？",
      ok: "显示"
    },
    signature: {
      title: "签名",
      message:
        "复制以下主地址的私钥签名的数据"
    },
    stake: {
      title: "股份",
      message: "你想入股吗？",
      ok: "股份"
    },
    sweepAll: {
      title: "扫描所有",
      message: "你想全部扫地吗？",
      ok: "扫荡所有"
    },
    sweepAllWarning: {
      title: "扫描所有警告",
      message:
        "您即将通过发送交易来合并所有未用资金，您的钱包可能会暂时显示 0 的余额，在 10 个块后，您的资金将解锁，您可以正常投注。",
      ok: "继续"
    },
    switchWallet: {
      title: "切换钱包",
      closeMessage: "是否确实要关闭当前钱包？",
      restartMessage:
        "钱包 RPC 当前正在同步。 \n如果你想切换钱包，那么你必须重新启动应用程序。 \n您将失去同步进度，必须再次重新扫描区块链。",
      restartWalletMessage:
        "如果你想切换钱包，那么你必须重新启动应用程序。是否确实要关闭当前钱包并重新启动？"
    },
    transactionDetails: {
      title: "交易详情",
      ok: "关闭"
    },
    transfer: {
      title: "转移",
      message: "是否要发送交易记录？",
      ok: "发送"
    },
    confirmTransaction: {
      title: "确认交易",
      sendTo: "发送到",
      priority: "优先"
    },
    unlockConfirm: {
      title: "确认解锁",
      ok: "解 锁"
    },
    unlockServiceNode: {
      title: "解锁服务节点",
      confirmTitle: "确认解锁",
      message: "是否要解锁服务节点？",
      ok: "解 锁"
    },
    unlockServiceNodeWarning: {
      title: "解锁服务节点警告",
      message:
        "如果将共享节点用于让操作员和其他参与者知道您未入股，则解锁节点中的部分利害关系也会使任何其他参与者无法使用。",
      ok: "继续"
    }
  },
  fieldLabels: {
    // Field labels are also all uppercased
    address: "地址",
    amount: "量",
    backupOwner: "备份所有者",
    confirmPassword: "确认密码",
    daemonLogLevel: "守护进程日志级别",
    daemonP2pPort: "守护神 P2P 端口",
    data: "数据",
    dataStoragePath: "数据存储路径",
    decryptRecord: "解密记录",
    filter: "滤波器",
    filterTransactionType: "按事务类型筛选",
    internalWalletPort: "内部钱包端口",
    keyImages: {
      exportDirectory: "密钥图像导出目录",
      importFile: "密钥图像导入文件"
    },
    limitDownloadRate: "限制下载速率",
    limitUploadRate: "限制上传速率",
    lnsType: "LNS 记录类型",
    localDaemonIP: "本地守护神 IP",
    localDaemonPort: "本地守护港",
    gyuanxnetFullAddress: "GYUANXNET 完整地址",
    maxIncomingPeers: "最大传入连接",
    maxOutgoingPeers: "最大传出连接",
    message: "消息",
    mnemonicSeed: "字种子",
    name: "名字",
    newWalletName: "新钱包名称",
    notes: "笔记",
    optional: "可选的",
    owner: "所有者",
    password: "密码",
    paymentId: "付款 ID",
    priority: "优先",
    remoteNodeHost: "远程节点主机",
    remoteNodePort: "远程节点端口",
    restoreFromBlockHeight: "从块高度恢复",
    restoreFromDate: "从日期还原",
    seedLanguage: "种子语言",
    serviceNodeCommand: "服务节点命令",
    serviceNodeKey: "服务节点键",
    sessionId: "会话 ID",
    signature: "签名",
    transactionId: "交易 ID",
    walletFile: "钱包文件",
    walletLogLevel: "钱包日志级别",
    walletName: "钱包名称",
    walletRPCPort: "钱包 RPC 端口",
    walletStoragePath: "钱包存储路径",

    // These are specific labels which do not get uppercased
    confirmNewPassword: "确认新密码",
    newPassword: "新密码",
    oldPassword: "旧密码",
    rescanFullBlockchain: "重新扫描完整区块链",
    rescanSpentOutputs: "重新扫描已用的输出",
    transactionNotes: "交易说明",
    chooseNetwork: "选择网络",
    network: "网络"
  },
  footer: {
    ready: "准备",
    scanning: "扫描",
    status: "地位",
    syncing: "同步",
    remote: "远程",
    wallet: "钱包",
    updateRequired: "需要更新"
  },
  menuItems: {
    about: "关于",
    changePassword: "更改密码",
    copyAddress: "复制地址",
    copyBackupOwner: "复制备份所有者",
    copyGyuanxnetAddress: "复制 gyuanxnet 地址",
    copyGyuanxnetName: "复制 gyuanxnet 名称",
    copyName: "复制名称",
    copyOwner: "复制所有者",
    copyQR: "复制二维码",
    copySeedWords: "复制种子词",
    copySessionId: "复制会话 ID",
    copySpendKey: "复制花费密钥",
    copyServiceNodeKey: "复制服务节点密钥",
    copyTransactionId: "复制事务 ID",
    copyViewKey: "复制视图键",
    createNewWallet: "创建新钱包",
    deleteWallet: "删除钱包",
    exit: "退出 Gyuanx GUI 钱包",
    importOldGUIWallet: "从旧 GUI 导入钱包",
    manageKeyImages: "管理关键图像",
    openWallet: "打开钱包",
    rescanWallet: "重新扫描钱包",
    restoreWalletFile: "从文件恢复钱包",
    restoreWalletSeed: "从种子恢复钱包",
    saveQR: "将 QR 码保存到文件",
    sendToThisAddress: "发送到此地址",
    settings: "设置",
    showDetails: "显示详细信息",
    showPrivateKeys: "显示私钥",
    showQRCode: "显示二维码",
    switchWallet: "切换钱包",
    viewOnExplorer: "查看资源管理器"
  },
  notification: {
    positive: {
      addressCopied: "复制到剪贴板的地址",
      backupOwnerCopied: "复制到剪贴板的备份所有者",
      bannedPeer: "禁止 {host} 直到 {time}",
      copied: "{item} 复制到剪贴板",
      decryptedLNSRecord: "已成功解密 LNS 记录 {name}",
      itemSaved: "{item} 保存到 {filename}",
      keyImages: {
        exported: "导出到的关键图像 {filename}",
        imported: "导入的关键图像"
      },
      lnsRecordUpdated: "LNS 记录已成功更新",
      gyuanxnetAddressCopied: "复制了完整的 gyuanxnet 地址",
      gyuanxnetNameCopied: "Gyuanxnet 已复制的名称",
      passwordUpdated: "密码已更新",
      namePurchased: "已成功购买名称",
      nameRenewed: "名称已成功续订",
      nameCopied: "复制到剪贴板的名称",
      ownerCopied: "所有者复制到剪贴板",
      qrCopied: "复制到剪贴板的 QR 码",
      registerServiceNodeSuccess: "已成功注册的服务节点",
      sendSuccess: "已成功发送事务",
      serviceNodeInfoFilled: "服务节点键和最小填充金额",
      sessionIdCopied: "复制到剪贴板的会话 ID",
      signatureCopied: "复制到剪贴板的签名",
      signatureVerified: "已验证签名",
      stakeSuccess: "成功投注",
      transactionNotesSaved: "已保存交易记录说明"
    },
    errors: {
      banningPeer: "禁止对等体错误",
      cannotAccessRemoteNode:
        "无法访问远程节点，请尝试其他远程节点",
      changingPassword: "更改密码错误",
      copyWalletFail: "无法复制钱包",
      copyingPrivateKeys: "复制私钥时出错",
      dataPathNotFound: "未找到数据存储路径",
      decryptLNSRecord: "无法解密 LNS 记录 {name}",
      differentNetType: "远程节点使用不同的网络类型",
      enterSeedWords: "输入种子词",
      enterTransactionId: "输入交易记录 ID",
      enterTransactionProof: "输入交易记录证明",
      enterWalletName: "输入钱包名称",
      enterName: "输入名称",
      errorSavingItem: "错误保存 {item}",
      failedServiceNodeUnlock: "无法解锁服务节点",
      failedToSetLanguage: "无法设置语言： {lang}",
      failedWalletImport: "无法导入钱包",
      failedWalletOpen: "无法打开钱包。请重试。",
      failedWalletRead: "无法读取钱包",
      internalError: "内部错误",
      invalidAddress: "地址无效",
      invalidAmount: "金额无效",
      invalidBackupOwner: "备份所有者地址无效",
      invalidNameLength: "名称必须介于 1 到 64 个字符之间",
      invalidNameFormat:
        "名称只能包含字母数字、连字符和下划线",
      invalidNameHypenNotAllowed:
        "名称只能以字母数字或下划线开头或结束",
      invalidOldPassword: "旧密码无效",
      invalidOwner: "所有者地址无效",
      invalidPassword: "密码无效",
      invalidPaymentId: "付款 ID 无效",
      invalidPrivateViewKey: "无效的私有视图键",
      invalidPublicAddress: "无效的公共地址",
      invalidRestoreDate: "无效的恢复日期",
      invalidRestoreHeight: "无效恢复高度",
      invalidSeedLength: "无效的种子字长度",
      invalidServiceNodeCommand:
        "请输入服务节点注册命令",
      invalidServiceNodeKey: "服务节点密钥无效",
      invalidSessionId: "会话 ID 无效",
      invalidSignature: "签名无效",
      invalidWalletPath: "无效的钱包路径",
      keyImages: {
        exporting: "导出关键图像时出错",
        reading: "读取关键图像时出错",
        importing: "导入关键映像时出错"
      },
      negativeAmount: "金额不能为负数",
      newPasswordNoMatch: "新密码不匹配",
      newPasswordSame: "新密码必须不同",
      notEnoughBalance: "解锁余额不足",
      passwordNoMatch: "密码不匹配",
      remoteCannotBeReached: "无法访问远程守护进程",
      selectWalletFile: "选择钱包文件",
      unknownError: "发生未知错误",
      walletAlreadyExists: "名称已存在的钱包",
      walletPathNotFound: "未找到钱包数据存储路径",
      zeroAmount: "金额必须大于零"
    },
    warnings: {
      noKeyImageExport: "未找到要导出的关键图像",
      usingLocalNode: "无法访问远程节点，仅切换到本地",
      usingRemoteNode: "找不到 gyuanxd，使用远程节点"
    }
  },
  placeholders: {
    additionalNotes: "其他备注",
    addressBookName: "属于此地址的名称",
    addressOfSigner: "签名者的公共钱包地址",
    dataToSign: "要使用主地址的私钥签名的数据",
    filterTx: "输入 ID、姓名、地址或金额",
    hexCharacters: "{count} 十六进制字符",
    lnsName: "通过 Gyuanx 名称服务购买的名称",
    lnsBackupOwner: "备份所有者的钱包地址",
    lnsDecryptName: "属于你的 LNS 名称",
    gyuanxnetFullAddress:
      "将 LNS 名称映射到的完整 gyuanxnet 地址（不带 .gyuanx）",
    mnemonicSeed: "25（或24）字 mnemonic seed",
    pasteTransactionId: "粘贴事务 ID",
    pasteTransactionProof: "粘贴事务证明",
    proveOptionalMessage:
      "签名签名的可选消息",
    recipientWalletAddress: "收件人的钱包地址",
    selectAFile: "请选择文件",
    sessionId: "要链接到 Gyuanx 名称服务的会话 ID",
    signature: "要验证的签名",
    transactionNotes: "本地附加到交易记录的其他注释",
    unsignedData: "数据在签名前应查看",
    walletName: "你钱包的名字",
    walletPassword: "钱包的可选密码"
  },
  strings: {
    addAddressBookEntry: "添加通讯簿条目",
    addressBookDetails: "通讯簿详细信息",
    addressBookIsEmpty: "通讯簿为空",
    addresses: {
      myPrimaryAddress: "我的主要地址",
      myUnusedAddresses: "我未使用的地址",
      myUsedAddresses: "我用过的地址",
      primaryAddress: "主要地址",
      subAddress: "子地址",
      subAddressIndex: "指数 {index}"
    },
    advancedOptions: "高级选项",
    awaitingConfirmation: "等待确认",
    bannedPeers: {
      title: "禁止的对等体（如果钱包重新启动，禁令将被清除）",
      bannedUntil: "禁止， 直到 {time}"
    },
    blockHeight: "高度",
    cannotSign: "您不能只使用视图钱包进行签名。",
    checkTransaction: {
      description:
        "通过提供交易 ID、收件人地址、用于签名的邮件和签名，验证资金是否已支付给地址。\n对于'支出证明'，您不需要提供收件人地址。",
      infoTitles: {
        confirmations: "确认",
        inPool: "在池中",
        validTransaction: "有效交易",
        received: "收到金额"
      },
      validTransaction: {
        no: "不",
        yes: "是的"
      }
    },
    closing: "关闭",
    connectingToBackend: "连接到后端",
    contribution: "贡献",
    contributor: "贡献",
    daemon: {
      local: {
        title: "仅本地守护程序",
        description:
          "完全安全，钱包将下载完整的区块链。在同步完成之前，您将无法进行交易。"
      },
      localRemote: {
        title: "本地 + 远程守护程序",
        description:
          "使用此默认选项快速入门。钱包将下载完整的区块链，但在同步时使用远程节点。"
      },
      remote: {
        title: "仅远程守护程序",
        description:
          "安全性较低，钱包将连接到远程节点以进行所有交易."
      }
    },
    destinationUnknown: "目标未知",
    editAddressBookEntry: "编辑通讯簿条目",
    expirationHeight: "过期高度",
    lns: {
      sessionID: "Session ID",
      gyuanxnetName1Year: "Gyuanxnet 名字 1 年",
      gyuanxnetNameXYears: "Gyuanxnet 名字 {years} 年",
      prices: "LNS 价格:"
    },
    lnsPurchaseDescription:
      "购买或更新 LNS 记录。如果您购买了名称，则可能需要一两分钟才能在列表中显示该名称。",
    lnsDescription:
      "在这里，您可以找到这个钱包拥有的所有 LNS 名称。解密您拥有的记录将返回该 LNS 记录的名称和值。",
    loadingSettings: "加载设置",
    gyuanxBalance: "平衡",
    gyuanxnetNameDescription:
      "在 Gyuanxnet 上购买或更新名称。如果您购买了名称，它可能需要一两分钟才能在列表中显示。要了解有关 gyuanxnet 的更多了解，请访问： ",
    gyuanxUnlockedBalance: "解锁余额",
    gyuanxUnlockedShort: "解 锁",
    me: "我",
    noTransactionsFound: "未找到交易记录",
    notes: "笔记",
    numberOfUnspentOutputs: "未用产出数",
    operator: "算子",
    paymentID: "付款 ID",
    peerList: "连接列表",
    priorityOptions: {
      automatic: "自动",
      slow: "慢",
      normal: "正常",
      fast: "快速",
      fastest: "快",
      blink: "眨眼"
    },

    proveTransactionDescription:
      "通过提供交易 ID、收件人地址和可选邮件，生成传入/传出付款的证明。\n对于传出付款的情况，您可以获得证明交易作者身份的"支出证明"。在这种情况下，您不需要指定收件人地址。",
    readingWalletList: "阅读钱包列表",
    recentIncomingTransactionsToAddress:
      "最近到此地址的传入事务",
    recentTransactionsWithAddress: "最近具有此地址的事务",
    rescanModalDescription:
      "仅选择已用输出的完全重新扫描或重新扫描。",
    saveSeedWarning: "请复制并保存这些在一个安全的位置！",
    saveToAddressBook: "保存到通讯簿",
    seedWords: "种子词",
    selectLanguage: "选择语言",
    serviceNodeContributionDescription:
      "投注有助于 Gyuanx 网络的安全。为了您的贡献，您赚取GYUANX。 一旦投注，你将不得不等待15或30天，有你的GYUANX解锁， 取决于参与者是否解锁了支点或节点已取消注册。要了解有关投注的详细信息，请访问",
    serviceNodeRegistrationDescription:
      '输入 {registerCommand} 由注册成为服务节点的守护进程产生的命令 "{prepareCommand}" 命令',
    serviceNodeStartStakingDescription:
      "要开始投注，请访问投注选项卡",
    noServiceNodesCurrentlyAvailable:
      "当前没有可用于贡献的服务节点",
    serviceNodeDetails: {
      contributors: "贡献",
      lastRewardBlockHeight: "最后奖励块高度",
      lastUptimeProof: "上次正常运行时间证明",
      maxContribution: "最大贡献",
      minContribution: "最小贡献",
      operatorFee: "运营商费用",
      registrationHeight: "注册高度",
      unlockHeight: "解锁高度",
      reserved: "保留",
      serviceNodeKey: "服务节点密钥",
      snKey: "SN 键",
      stakingRequirement: "投注要求",
      totalContributed: "捐款总额"
    },
    signAndVerifyDescription:
      "使用主地址的私钥对数据进行签名，或根据公共地址验证签名。",
    spendKey: "花费密钥",
    startingDaemon: "正在启动守护程序",
    startingWallet: "起始钱包",
    switchToDateSelect: "切换到日期选择",
    switchToHeightSelect: "切换到高度选择",
    syncingDaemon: "同步守护进程",
    transactionID: "交易 ID",
    transactionConfirmed: "证实",
    transactions: {
      amount: "量",
      description: "{type} 交易",
      fee: "费",
      paidBySender: "由发件人支付",
      received: "收到",
      sent: "送",
      sentTo: "{type} 发送到的事务",
      timestamp: "时间 戳",
      types: {
        all: "所有",
        incoming: "传入",
        outgoing: "外向",
        pending: "等待",
        pendingIncoming: "待定传入",
        pendingOutgoing: "待处理传出",
        miner: "矿工",
        serviceNode: "服务节点",
        governance: "治理",
        stake: "赌注",
        failed: "失败"
      }
    },
    unlockingAtHeight: "在高度解锁 {number}",
    unspentOutputs: "未用产出",
    userNotUsedAddress: "您尚未使用此地址",
    userUsedAddress: "您已使用此地址",
    viewKey: "查看键",
    viewOnlyMode:
      "仅查看模式。请装满钱包才能寄出硬币。",
    website: "网站"
  },
  titles: {
    addressBook: "通讯簿",
    addressDetails: "地址详细信息",
    advanced: {
      checkTransaction: "检查交易记录",
      prove: "证明",
      signAndVerify: "标志/验证",
      sign: "标志",
      verify: "验证"
    },
    availableForContribution: "可用于贡献的服务节点",
    changePassword: "更改密码",
    configure: "配置",
    currentlyStakedNodes: "当前投注节点",
    lnsRecordDetails: "LNS 记录详细信息",
    lnsSessionRecords: "Session 记录",
    lnsGyuanxnetRecords: "Gyuanxnet 记录",
    privateKeys: "私钥",
    rescanWallet: "重新扫描钱包",
    lns: {
      purchase: "购买",
      myLns: "我的 LNS"
    },
    serviceNode: {
      registration: "注册",
      staking: "投注",
      myStakes: "我的赌注"
    },

    serviceNodeDetails: "服务节点详细信息",
    settings: {
      title: "设置",
      tabs: {
        general: "常规",
        language: "语言",
        peers: "连接"
      }
    },
    transactionDetails: "交易详情",
    transactions: "交易",
    wallet: {
      createNew: "创建新钱包",
      createdOrRestored: "创建/恢复的钱包",
      importFromFile: "从文件导入钱包",
      importFromLegacyGUI: "从旧版 GUI 导入钱包",
      importFromOldGUI: "从旧 GUI 导入钱包",
      restoreFromSeed: "从种子恢复钱包",
      restoreViewOnly: "还原仅查看钱包"
    },
    welcome: "欢迎",
    yourWallets: "您的钱包"
  }
};
