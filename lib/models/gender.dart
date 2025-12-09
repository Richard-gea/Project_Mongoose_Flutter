class Gender {
  final String? id;
  final String genderName;
  final String displayName;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Gender({
    this.id,
    required this.genderName,
    required this.displayName,
    this.createdAt,
    this.updatedAt,
  });

  factory Gender.fromJson(Map<String, dynamic> json) {
    String? extractId() {
      final idField = json['_id'] ?? json['id'];
      if (idField == null) return null;
      
      if (idField is Map<String, dynamic> && idField.containsKey('\$oid')) {
        return idField['\$oid']?.toString();
      }
      
      return idField.toString();
    }

    return Gender(
      id: extractId(),
      genderName: json['genderName'] ?? '',
      displayName: json['displayName'] ?? '',
      createdAt: json['createdAt'] != null 
          ? DateTime.parse(json['createdAt'])
          : null,
      updatedAt: json['updatedAt'] != null 
          ? DateTime.parse(json['updatedAt'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'genderName': genderName,
      'displayName': displayName,
    };
  }

  @override
  String toString() {
    return 'Gender(id: $id, genderName: $genderName, displayName: $displayName)';
  }
}
